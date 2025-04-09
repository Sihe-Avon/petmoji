/**
 * PetMoji API Integration Module
 * Handles communication with external APIs for pet emotion detection and text generation
 */

// API Configuration
const API_CONFIG = {
    replicate: {
        apiKey: 'r8_3FYjciLcMGBBm9xoeRF7pHjyJ1N6iWt015NvQ',
        baseUrl: 'https://api.replicate.com/v1/predictions',
        modelVersion: '2b017d9b67edd2ee1401238df49d75da53c8490aaa2f6c1edf4f329454022f5e'
    }
};

/**
 * Generate emotion text using Replicate API
 * @param {string} petType - Type of pet (dog, cat, etc.)
 * @param {string} emotion - Detected emotion
 * @param {string} style - Selected artistic style
 * @returns {Promise<string>} - Generated emotion text
 */
async function generateEmotionText(petType, emotion, style) {
    try {
        // Construct prompt based on pet type, emotion and style
        const prompt = `Generate a short, cute thought bubble text (max 25 chars) for a ${petType} that is feeling ${emotion}. Style: ${style}.`;
        
        // Call Replicate API using Llama model
        const response = await fetch(API_CONFIG.replicate.baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${API_CONFIG.replicate.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version: API_CONFIG.replicate.modelVersion,
                input: {
                    prompt: prompt,
                    max_length: 50,
                    temperature: 0.75
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if we have a prediction ID
        if (data && data.id) {
            // Poll for results
            return await pollForResults(data.id);
        } else {
            throw new Error('No prediction ID received from API');
        }
    } catch (error) {
        console.error('Error generating emotion text:', error);
        
        // Fallback to default text
        return getDefaultEmotionText(petType, emotion);
    }
}

/**
 * Poll Replicate API for prediction results
 * @param {string} predictionId - ID of the prediction to poll for
 * @returns {Promise<string>} - Generated text
 */
async function pollForResults(predictionId) {
    const maxAttempts = 10;
    const pollInterval = 1000; // 1 second
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const response = await fetch(`${API_CONFIG.replicate.baseUrl}/${predictionId}`, {
                headers: {
                    'Authorization': `Token ${API_CONFIG.replicate.apiKey}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`Polling failed with status ${response.status}`);
            }
            
            const data = await response.json();
            
            // Check if prediction is complete
            if (data.status === 'succeeded') {
                // Return the generated text
                return data.output || 'Woof! What a day!';
            } else if (data.status === 'failed') {
                throw new Error('Prediction failed');
            }
            
            // Wait before next poll
            await new Promise(resolve => setTimeout(resolve, pollInterval));
        } catch (error) {
            console.error('Error polling for results:', error);
            throw error;
        }
    }
    
    // If we've reached max attempts, return default text
    throw new Error('Max polling attempts reached');
}

/**
 * Get default emotion text if API fails
 * @param {string} petType - Type of pet
 * @param {string} emotion - Detected emotion
 * @returns {string} - Default emotion text
 */
function getDefaultEmotionText(petType, emotion) {
    const defaultTexts = {
        dog: {
            happy: "I love treats! 🐾",
            sad: "I miss you...",
            excited: "WALKIES TIME!!!"
        },
        cat: {
            happy: "Feed me now! 😺",
            sad: "Human, attention!",
            excited: "Bird watching time!"
        }
    };
    
    // Get text for the pet type and emotion, or use dog/happy as default
    return (defaultTexts[petType] && defaultTexts[petType][emotion]) || 
           defaultTexts.dog.happy;
}

// Export functions
export { generateEmotionText };
