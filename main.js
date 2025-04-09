/**
 * PetMoji - AI Pet Emotion Translator
 * Main JavaScript functionality
 */

// 全局变量，使用固定的API令牌
hfToken = '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';

// Enhanced emotion text generator function
function generateEmotionText(petType, emotion, style) {
    try {
        // Expanded emotion texts with more variety and fun expressions
        const emotionTexts = {
            dog: {
                happy: ["Tail wagging at maximum speed!", "Best day ever! Treats please!", "So happy I could fetch all day!"],
                sad: ["I miss you when you're gone...", "Need extra cuddles right now", "Why is my toy under the couch?"],
                angry: ["That squirrel is trespassing again!", "Someone took my spot on the couch!", "Mail carrier alert! WOOF!"],
                excited: ["WALKIES TIME!!!", "SQUIRREL SPOTTED!!!", "DID SOMEONE SAY TREAT???"],
                scared: ["Thunder is too loud!", "Vacuum monster is back!", "Vet visit? Nooooo!"],
                curious: ["What's that smell?", "Is that food you're eating?", "Something moved in the bushes!"],
                sleepy: ["Five more minutes of nap time...", "Your lap looks comfy right now", "Dreaming of endless treats..."],
                confused: ["Did you say 'walk' or 'talk'?", "Ball disappeared? How?", "Why does cat get on counter but I don't?"],
                playful: ["Let's play tug-of-war!", "Chase me if you can!", "Ball! Ball! Throw the ball!"],
                relaxed: ["This sunbeam is perfect", "Belly rubs have me in heaven", "Couch potato mode activated"],
                surprised: ["A CAT in MY yard?!", "Treat appeared from nowhere!", "You're home early!"],
                content: ["Life is good with my human", "Perfect day for a nap", "Just happy to be with you"],
                bored: ["We haven't played in HOURS", "Same old toys...", "Need something to chew on"],
                anxious: ["Don't leave me alone!", "Something feels off today", "Need to check all the windows again"],
                proud: ["I protected the house today!", "Caught the ball every time!", "I'm the goodest boy!"],
                shy: ["New people are scary", "I'll just hide behind you", "Too many eyes on me"],
                grumpy: ["It's too early for this", "That's MY toy", "Need alone time right now"]
            },
            cat: {
                happy: ["Purring at maximum volume!", "You may pet me now, human", "This sunbeam is purrfect"],
                sad: ["My food bowl is half empty...", "You've been gone forever", "Need chin scratches stat"],
                angry: ["You moved my bed ONE INCH", "Tail twitching in disapproval", "3am is the perfect time for chaos"],
                excited: ["Bird watching time!", "New box to explore!!!", "The red dot has returned!!!"],
                scared: ["Cucumber alert!", "Strange noise detected!", "New human in MY territory?!"],
                curious: ["What's in that bag?", "Must investigate new smell", "Something moved and I must check"],
                sleepy: ["Need 16 more hours of sleep", "Your laptop is my bed now", "Dreaming of world domination..."],
                confused: ["The red dot disappeared again", "Why is water wet?", "Door closed? But I just wanted out..."],
                playful: ["3am zoomies activated!", "Your ankles look biteable", "Everything is a toy!"],
                relaxed: ["Loaf mode engaged", "Found the perfect napping spot", "Slow blinks of contentment"],
                surprised: ["A DOG on MY territory?!", "Treat appeared from nowhere!", "You saw me fall? No you didn't."],
                content: ["Kneading on soft blanket", "Purring softly in the sun", "This box is just right"],
                bored: ["I've knocked everything off already", "Need new furniture to scratch", "Time to create chaos"],
                anxious: ["New smell in the house", "Something's different and I don't like it", "Need to hide under bed"],
                proud: ["Brought you a 'gift'!", "Climbed to the highest shelf!", "Caught that toy all by myself!"],
                shy: ["Hiding under bed for now", "Will observe from a distance", "Too many new sounds"],
                grumpy: ["Do not disturb my slumber", "Pet me exactly three times", "Food bowl is empty, fix it human"]
            },
            rabbit: {
                happy: ["Binky jumps of joy!", "Nose twitches of happiness", "Flopped in pure contentment"],
                sad: ["Hay isn't fresh enough", "Need more pets please", "Missing my bunny friend"],
                excited: ["Treat time makes me zoom!", "Fresh greens! Fresh greens!", "Time for garden exploration!"],
                // Add more emotions for rabbit...
                default: ["*happy bunny noises*", "*curious ear twitches*", "*gentle nose boops*"]
            },
            // Default for any pet type
            default: {
                happy: ["So happy right now!", "Best day ever!", "Life is good!"],
                sad: ["Feeling blue today", "Need some comfort", "Missing you"],
                angry: ["Not in the mood", "Boundaries, please", "Need some space"],
                excited: ["Can't contain my excitement!", "Something amazing is happening!", "Let's go!"],
                scared: ["That was startling!", "Need a safe space", "Seeking protection"],
                curious: ["What's that?", "Need to investigate", "Something interesting..."],
                sleepy: ["Nap time, please", "So tired right now", "Dreams are calling"],
                confused: ["What's happening?", "Don't understand", "Mixed signals"],
                playful: ["Let's have fun!", "Play time!", "Games are the best!"],
                relaxed: ["Just chilling", "Perfect relaxation", "Peace and quiet"],
                surprised: ["Didn't see that coming!", "What a shock!", "That was unexpected!"],
                content: ["All is well", "Perfectly satisfied", "Nothing more needed"],
                bored: ["Need entertainment", "Same old routine", "Looking for something to do"],
                anxious: ["Feeling unsettled", "Something's not right", "Need reassurance"],
                proud: ["Look what I did!", "Accomplished something great", "Feeling important"],
                shy: ["A bit overwhelmed", "Need some space", "Taking it slow"],
                grumpy: ["Not in the mood", "Leave me alone", "Having a rough day"]
            }
        };
        
        // Get pet-specific texts or default
        const petTexts = emotionTexts[petType] || emotionTexts.default;
        
        // Get emotion-specific texts or default happy
        const texts = petTexts[emotion] || petTexts.default || emotionTexts.default[emotion] || emotionTexts.default.happy;
        
        // Pick a random text from the array
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    } catch (error) {
        console.error('Error generating emotion text:', error);
        return `I'm feeling ${emotion || 'happy'} today!`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 显示上传部分
    document.getElementById('upload-section').classList.remove('hidden');
    
    // DOM Elements
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const uploadSection = document.getElementById('upload-section');
    const styleSection = document.getElementById('style-section');
    const processingSection = document.getElementById('processing-section');
    const resultsSection = document.getElementById('results-section');
    const previewImage = document.getElementById('preview-image');
    const processingImage = document.getElementById('processing-image');
    const originalImage = document.getElementById('original-image');
    const resultImage = document.getElementById('result-image');
    const progressBar = document.getElementById('progress-bar');
    const currentStepElement = document.getElementById('current-step');
    const translateButton = document.getElementById('translate-button');
    const downloadButton = document.getElementById('download-button');
    const shareButton = document.getElementById('share-button');
    const tryAgainButton = document.getElementById('try-again-button');
    const styleOptions = document.querySelectorAll('.style-option');
    const emotionText = document.getElementById('emotion-text');
    const previewContainer = document.getElementById('preview-container'); 
    const uploadPrompt = document.getElementById('upload-prompt'); 
    const petTypeSelect = document.getElementById('pet-type-select'); 
    const hfTokenInput = document.getElementById('hf-token-input');
    const saveTokenBtn = document.getElementById('save-token-btn');
    const apiSetupNotice = document.querySelector('.api-setup-notice');
    
    // State variables
    let selectedStyle = null;
    let uploadedImage = null;
    let petType = 'dog'; 
    let emotion = 'happy'; 
    
    // Save token to localStorage if not already there
    if (!localStorage.getItem('hf_token')) {
        localStorage.setItem('hf_token', hfToken);
    }
    
    // If token exists, hide the notice
    if (hfToken) {
        apiSetupNotice.classList.add('hidden');
    }
    
    // Pre-fill token input if exists
    if (hfTokenInput && hfToken) {
        hfTokenInput.value = hfToken;
    }
    
    // Save token button click handler
    if (saveTokenBtn) {
        saveTokenBtn.addEventListener('click', () => {
            const token = hfTokenInput.value.trim();
            if (token && token.startsWith('hf_')) {
                localStorage.setItem('hf_token', token);
                hfToken = token;
                apiSetupNotice.classList.add('hidden');
                alert('');
            } else {
                alert('');
            }
        });
    }
    
    // Fun loading messages to keep users engaged
    const funLoadingMessages = [
        "Decoding your pet's secret language...",
        "Translating tail wags and purrs...",
        "Consulting with pet psychologists...",
        "Analyzing whisker twitches...",
        "Measuring ear positions for emotional cues...",
        "Calculating happiness quotient...",
        "Interpreting paw gestures...",
        "Scanning for signs of treat excitement...",
        "Detecting play mode activation...",
        "Quantifying cuddle worthiness...",
        "Measuring zoomies potential...",
        "Evaluating nap quality indicators...",
        "Reading between the meows...",
        "Deciphering bark tonality...",
        "Converting pet thoughts to human language..."
    ];
    
    // Function to get a random loading message
    function getRandomLoadingMessage() {
        return funLoadingMessages[Math.floor(Math.random() * funLoadingMessages.length)];
    }
    
    // Style filter effects for fallback when API fails
    const styleEffects = {
        'cartoon': applyFallbackCartoonEffect,
        '3dchibi': applyFallback3dChibiEffect,
        'pixel': applyFallbackPixelEffect
    };
    
    /**
     * Apply style transfer using Hugging Face API (image-to-image)
     * @param {string} imageData - Base64 image data
     * @param {string} style - Style to apply (cartoon, 3dchibi, pixel)
     * @param {string} petType - Type of pet (dog, cat, etc.)
     * @param {string} emotion - Detected emotion (happy, sad, etc.)
     * @returns {Promise<string>} - URL of the styled image
     */
    async function applyStyleTransfer(imageData, style, petType = 'dog', emotion = 'happy') {
        try {
            // Extract base64 data without the prefix
            const base64Data = imageData.split(',')[1];
            
            // 使用支持图像到图像转换的模型
            const modelUrl = 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5';
            
            // 创建风格特定的提示词来引导图像生成
            let prompt = '';
            
            switch(style) {
                case 'cartoon':
                    prompt = `A ${petType} with ${emotion} expression, Studio Ghibli style, Miyazaki inspired, hand-drawn animation, soft colors, detailed background, warm lighting, high quality artwork`;
                    break;
                case '3dchibi':
                    prompt = `A cute 3D chibi ${petType} with ${emotion} expression, big head small body, adorable, 3D rendered, soft lighting, smooth textures, high quality, detailed`;
                    break;
                case 'pixel':
                    prompt = `Pixel art of a ${petType} with ${emotion} expression, 8-bit style, retro game graphics, limited color palette, pixelated, nostalgic, high quality, detailed`;
                    break;
                default:
                    prompt = `A ${petType} with ${emotion} expression, artistic style, high quality, detailed`;
            }
            
            // 添加负面提示词以避免常见问题
            const negative_prompt = "blurry, bad anatomy, bad proportions, deformed, disfigured, missing limbs, extra limbs, weird hands, distorted face, low quality, watermark";
            
            console.log(`Using prompt: ${prompt}`);
            console.log(`Using image-to-image model: ${modelUrl}`);
            console.log(`Using API token: ${hfToken.substring(0, 5)}...${hfToken.substring(hfToken.length - 5)}`);
            
            // 调用Hugging Face API进行图像到图像转换
            const response = await fetch(modelUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${hfToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: {
                        prompt: prompt,
                        negative_prompt: negative_prompt,
                        image: base64Data,
                        num_inference_steps: 30,
                        guidance_scale: 7.5,
                        strength: 0.75
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            // 获取内容类型
            const contentType = response.headers.get('content-type');
            
            // 根据内容类型处理响应
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                
                // 检查模型是否仍在加载
                if (result.estimated_time) {
                    console.log(`Model is still loading, estimated time: ${result.estimated_time} seconds`);
                    // 等待模型加载完成后重试
                    await new Promise(resolve => setTimeout(resolve, result.estimated_time * 1000));
                    return applyStyleTransfer(imageData, style, petType, emotion);
                }
                
                // 检查错误
                if (result.error) {
                    throw new Error(result.error);
                }
                
                // 尝试提取图像数据
                if (Array.isArray(result) && result.length > 0) {
                    if (typeof result[0] === 'string') {
                        return `data:image/jpeg;base64,${result[0]}`;
                    } else if (result[0].generated_image) {
                        return `data:image/jpeg;base64,${result[0].generated_image}`;
                    }
                }
                
                throw new Error('Unexpected response format');
            } else {
                // 作为二进制数据处理
                const blob = await response.blob();
                
                if (blob.size === 0) {
                    throw new Error('Received empty blob');
                }
                
                return URL.createObjectURL(blob);
            }
        } catch (error) {
            console.error('Error applying style transfer:', error);
            
            // 如果API调用失败，尝试使用备用模型
            try {
                console.log('Trying fallback model...');
                // 使用备用模型
                const fallbackModelUrl = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1-base';
                
                // 提取base64数据
                const base64Data = imageData.split(',')[1];
                
                // 创建简化的提示词
                let fallbackPrompt = `A ${petType} with ${emotion} expression, ${style} style, high quality`;
                
                const fallbackResponse = await fetch(fallbackModelUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${hfToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        inputs: {
                            prompt: fallbackPrompt,
                            negative_prompt: "blurry, bad anatomy, bad proportions, deformed, disfigured, missing limbs, extra limbs, weird hands, distorted face, low quality, watermark",
                            image: base64Data,
                            num_inference_steps: 30,
                            guidance_scale: 7.5,
                            strength: 0.75
                        }
                    })
                });
                
                if (!fallbackResponse.ok) {
                    throw new Error(`Fallback API request failed with status ${fallbackResponse.status}`);
                }
                
                const blob = await fallbackResponse.blob();
                return URL.createObjectURL(blob);
            } catch (fallbackError) {
                console.error('Fallback model also failed:', fallbackError);
                // 如果备用模型也失败，返回原始图像
                return imageData;
            }
        }
    }
    
    /**
     * Detect pet type and emotion from image using Hugging Face API
     * @param {string} imageData - Base64 image data
     * @returns {Promise<Object>} - Detected pet type and emotion
     */
    async function detectPetAndEmotion(imageData) {
        try {
            // Extract base64 data without the prefix
            const base64Data = imageData.split(',')[1];
            
            // Use Hugging Face's image-to-text model for analysis
            const modelUrl = 'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large';
            
            console.log(`Calling Hugging Face API for pet detection: ${modelUrl}`);
            
            const response = await fetch(modelUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${hfToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: base64Data
                })
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            // Handle the response
            let description = '';
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                
                // Check if the model is still loading
                if (result.estimated_time) {
                    console.log(`Model is still loading, estimated time: ${result.estimated_time} seconds`);
                    await new Promise(resolve => setTimeout(resolve, result.estimated_time * 1000));
                    return detectPetAndEmotion(imageData);
                }
                
                // Extract description from result
                if (Array.isArray(result) && result.length > 0) {
                    description = result[0].generated_text || result[0];
                } else if (result.generated_text) {
                    description = result.generated_text;
                }
            } else {
                // Unexpected response type
                throw new Error('Unexpected response type');
            }
            
            console.log('Description:', description);
            
            // Extract pet type and emotion from description
            const petTypes = ['dog', 'cat', 'rabbit', 'hamster', 'bird', 'fish'];
            const emotions = [
                'happy', 'sad', 'angry', 'excited', 'scared', 'curious', 
                'sleepy', 'confused', 'playful', 'relaxed', 'surprised', 
                'content', 'bored', 'anxious', 'proud', 'shy', 'grumpy'
            ];
            
            // Determine pet type
            let detectedPetType = 'unknown';
            for (const pet of petTypes) {
                if (description.toLowerCase().includes(pet)) {
                    detectedPetType = pet;
                    break;
                }
            }
            
            // Default to dog if unknown
            if (detectedPetType === 'unknown') {
                detectedPetType = 'dog';
            }
            
            // Determine emotion
            let detectedEmotion = 'happy'; // Default
            let highestScore = 0;
            
            // Simple emotion detection
            for (const emotion of emotions) {
                if (description.toLowerCase().includes(emotion)) {
                    detectedEmotion = emotion;
                    break;
                }
            }
            
            return {
                petType: detectedPetType,
                emotion: detectedEmotion,
                description: description
            };
        } catch (error) {
            console.error('Error detecting pet and emotion:', error);
            
            // Return default values if detection fails
            return {
                petType: 'dog',
                emotion: 'happy',
                description: 'Unable to analyze image'
            };
        }
    }
    
    /**
     * Apply fallback cartoon effect if API fails
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {HTMLCanvasElement} canvas - Canvas element
     */
    function applyFallbackCartoonEffect(ctx, canvas) {
        // Apply cartoon effect with thought bubble
        ctx.filter = 'saturate(1.8) contrast(1.4) brightness(1.1)';
        ctx.globalAlpha = 1;
        
        // Draw a thought bubble
        const bubbleSize = Math.min(canvas.width, canvas.height) * 0.4;
        const bubbleX = canvas.width * 0.7;
        const bubbleY = canvas.height * 0.3;
        
        // Main bubble
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, bubbleSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = bubbleSize * 0.02;
        ctx.stroke();
        
        // Small bubbles leading to pet
        for (let i = 1; i <= 3; i++) {
            const smallBubbleSize = bubbleSize * (0.2 - i * 0.05);
            const offsetX = bubbleSize * 0.5 * i;
            const offsetY = bubbleSize * 0.5 * i;
            ctx.beginPath();
            ctx.arc(bubbleX - offsetX, bubbleY + offsetY, smallBubbleSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
    /**
     * Apply fallback 3dqversion effect if API fails
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {HTMLCanvasElement} canvas - Canvas element
     */
    function applyFallback3dChibiEffect(ctx, canvas) {
        // Apply 3dqversion effect
        ctx.filter = 'saturate(1.5) contrast(0.9) brightness(1.1) blur(1px)';
        ctx.globalAlpha = 0.9;
        
        // Add artistic text bubble
        const centerX = canvas.width * 0.5;
        const centerY = canvas.height * 0.4;
        const radius = Math.min(canvas.width, canvas.height) * 0.5;
        
        const gradient = ctx.createRadialGradient(
            centerX, centerY, radius * 0.1,
            centerX, centerY, radius
        );
        
        gradient.addColorStop(0, 'rgba(255, 182, 193, 0.7)'); // Light pink
        gradient.addColorStop(0.7, 'rgba(173, 216, 230, 0.3)'); // Light blue
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.save();
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    /**
     * Apply fallback pixel effect if API fails
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {HTMLCanvasElement} canvas - Canvas element
     */
    function applyFallbackPixelEffect(ctx, canvas) {
        // Apply pixel art effect
        const pixelSize = Math.max(canvas.width, canvas.height) / 50;
        
        // Create a temporary canvas for pixelation
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        const smallSize = {
            width: Math.floor(canvas.width / pixelSize),
            height: Math.floor(canvas.height / pixelSize)
        };
        
        tempCanvas.width = smallSize.width;
        tempCanvas.height = smallSize.height;
        
        // Draw small image
        tempCtx.drawImage(
            canvas, 
            0, 0, canvas.width, canvas.height, 
            0, 0, smallSize.width, smallSize.height
        );
        
        // Draw pixelated image back to main canvas
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            tempCanvas, 
            0, 0, smallSize.width, smallSize.height,
            0, 0, canvas.width, canvas.height
        );
        
        // Add pixel art speech bubble
        const bubbleWidth = canvas.width * 0.3;
        const bubbleHeight = canvas.height * 0.2;
        const bubbleX = canvas.width * 0.65;
        const bubbleY = canvas.height * 0.25;
        
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = pixelSize;
        
        // Draw pixelated bubble
        ctx.fillRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight);
        ctx.strokeRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight);
        
        // Draw pointer
        ctx.beginPath();
        ctx.moveTo(bubbleX, bubbleY + bubbleHeight);
        ctx.lineTo(bubbleX - bubbleWidth * 0.2, bubbleY + bubbleHeight + bubbleHeight * 0.5);
        ctx.lineTo(bubbleX + bubbleWidth * 0.2, bubbleY + bubbleHeight);
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }
    
    /**
     * Process the image with selected style
     * @returns {void}
     */
    async function processImage() {
        if (!uploadedImage || !selectedStyle) {
            alert('');
            return;
        }
        
        // Show processing section
        uploadSection.classList.add('hidden');
        styleSection.classList.add('hidden');
        processingSection.classList.remove('hidden');
        
        // Update processing image
        processingImage.src = previewImage.src;
        
        // Hugging Face API typically takes 15-30 seconds to generate an image
        const estimatedProcessingTime = 30000; // 30 seconds
        const progressUpdateInterval = 300; // Update progress every 300ms
        const totalSteps = estimatedProcessingTime / progressUpdateInterval;
        let currentStep = 0;
        
        // Start progress animation - slower and more realistic
        let progress = 0;
        let messageRotationInterval;
        const progressInterval = setInterval(() => {
            // Calculate progress with a non-linear curve that slows down at the end
            // This gives users a better expectation of remaining time
            currentStep++;
            if (currentStep <= totalSteps * 0.8) {
                // Move faster in the first 80% (0-80%)
                progress = Math.min(80, (currentStep / (totalSteps * 0.8)) * 80);
            } else {
                // Slow down for the last 20% (80-95%)
                // We only go to 95% automatically, the last 5% happens when the image is actually ready
                const remainingSteps = totalSteps - currentStep;
                const remainingProgress = 95 - progress;
                progress = Math.min(95, progress + (remainingProgress / (remainingSteps || 1)) * 0.5);
            }
            
            progressBar.style.width = `${progress}%`;
            
            // If we've reached 95%, stop the automatic progress
            if (progress >= 95) {
                clearInterval(progressInterval);
            }
        }, progressUpdateInterval);
        
        // Start rotating fun messages
        messageRotationInterval = setInterval(() => {
            const loadingMessageElement = document.getElementById('current-step');
            if (loadingMessageElement) {
                loadingMessageElement.textContent = getRandomLoadingMessage();
            }
        }, 3000);
        
        try {
            // Create a canvas for image processing
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Load the image
            const img = new Image();
            img.onload = async function() {
                // Set canvas dimensions
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Draw the original image on the canvas
                ctx.drawImage(img, 0, 0);
                
                // Detect pet type and emotion
                let detectionResult;
                try {
                    detectionResult = await detectPetAndEmotion(previewImage.src);
                    petType = detectionResult.petType;
                    emotion = detectionResult.emotion;
                    
                    // Update pet type select to match detected type
                    if (petTypeSelect) {
                        const option = Array.from(petTypeSelect.options).find(opt => opt.value === petType);
                        if (option) {
                            petTypeSelect.value = petType;
                        }
                    }
                    
                    console.log(`Detected pet type: ${petType}, emotion: ${emotion}`);
                } catch (detectionError) {
                    console.error('Pet detection failed:', detectionError);
                    // Use default values from UI
                    petType = petTypeSelect ? petTypeSelect.value : 'dog';
                    emotion = 'happy';
                }
                
                // Update current step text
                if (currentStepElement) {
                    currentStepElement.textContent = `Processing ${petType} in ${selectedStyle} style...`;
                }
                
                // Try to apply style transfer with API
                let styledImageUrl = null;
                let useLocalFallback = false;
                
                try {
                    console.time('styleTransfer');
                    styledImageUrl = await applyStyleTransfer(previewImage.src, selectedStyle, petType, emotion);
                    console.timeEnd('styleTransfer');
                    
                    if (!styledImageUrl) {
                        console.log('Style transfer returned null, using local fallback');
                        useLocalFallback = true;
                    }
                } catch (error) {
                    console.error('Style transfer failed:', error);
                    useLocalFallback = true;
                }
                
                // If style transfer failed or returned null, use local fallback
                if (useLocalFallback) {
                    console.log('Using local fallback effect');
                    // Apply local style effect as fallback
                    if (styleEffects[selectedStyle]) {
                        await styleEffects[selectedStyle](ctx, canvas);
                    }
                    styledImageUrl = canvas.toDataURL('image/jpeg');
                }
                
                // Generate emotion text
                let text = '';
                try {
                    text = generateEmotionText(petType, emotion, selectedStyle);
                } catch (error) {
                    console.error('Error generating emotion text:', error);
                    text = `I'm feeling ${emotion || 'happy'} today!`;
                }
                
                // Set the result images
                originalImage.src = previewImage.src;
                resultImage.src = styledImageUrl;
                
                // Update emotion text
                emotionText.textContent = text;
                
                // Stop message rotation
                if (messageRotationInterval) {
                    clearInterval(messageRotationInterval);
                }
                
                // Set progress to 100%
                progressBar.style.width = '100%';
                
                // Show result section
                processingSection.classList.add('hidden');
                resultsSection.classList.remove('hidden');
            };
            img.src = previewImage.src;
        } catch (error) {
            console.error('Error processing image:', error);
            alert('');
            
            // Stop progress animation
            clearInterval(progressInterval);
            if (messageRotationInterval) clearInterval(messageRotationInterval);
            
            // Show upload section again
            processingSection.classList.add('hidden');
            uploadSection.classList.remove('hidden');
        }
    }
    
    // Handle file selection
    function handleFileSelect(file) {
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                alert('');
                return;
            }
            
            uploadedImage = file;
            const reader = new FileReader();
            reader.onload = function(e) {
                // Show style selection section
                styleSection.classList.remove('hidden');
                uploadSection.classList.add('hidden');
                
                // Set preview images
                previewImage.src = e.target.result;
                processingImage.src = e.target.result;
                originalImage.src = e.target.result;
                
                // Auto-select first style if none selected
                if (!selectedStyle && styleOptions.length > 0) {
                    styleOptions[0].click();
                }
                
                // Scroll to style section
                styleSection.scrollIntoView({ behavior: 'smooth' });
            };
            reader.readAsDataURL(file);
        } else {
            alert('');
        }
    }
    
    // File input change
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            handleFileSelect(this.files[0]);
        }
    });
    
    // Drag and drop functionality
    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('border-blue-500');
    });
    
    dropzone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('border-blue-500');
    });
    
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('border-blue-500');
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });
    
    // Style option click
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            styleOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Set selected style
            selectedStyle = this.dataset.style;
        });
    });
    
    // Pet type select change
    petTypeSelect.addEventListener('change', function() {
        petType = this.value;
    });
    
    // Translate button click
    translateButton.addEventListener('click', processImage);
    
    // Download button click
    downloadButton.addEventListener('click', function() {
        // Create a temporary link to download the image
        const link = document.createElement('a');
        link.href = resultImage.src;
        link.download = `petmoji-${selectedStyle}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Share button click
    shareButton.addEventListener('click', function() {
        // Get the canvas data
        fetch(resultImage.src)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'petmoji.jpg', { type: 'image/jpeg' });
                
                // Create share menu
                const shareMenu = document.createElement('div');
                shareMenu.className = 'share-menu-overlay';
                shareMenu.innerHTML = `
                    <div class="share-menu">
                        <h2>Share Your PetMoji</h2>
                        <ul>
                            <li><a href="#" class="facebook-share"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="#" class="twitter-share"><i class="fab fa-x"></i></a></li>
                            <li><a href="#" class="instagram-share"><i class="fab fa-instagram"></i></a></li>
                            <li><a href="#" class="pinterest-share"><i class="fab fa-pinterest-p"></i></a></li>
                        </ul>
                        <button class="close-share-menu">Cancel</button>
                    </div>
                `;
                
                // Add event listeners to share menu items
                shareMenu.querySelector('.facebook-share').addEventListener('click', function(e) {
                    e.preventDefault();
                    // 使用更可靠的Facebook分享URL格式
                    const url = window.location.href || 'https://petmoji-app.vercel.app';
                    const facebookShareUrl = `https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=${encodeURIComponent(url)}&redirect_uri=${encodeURIComponent(url)}`;
                    window.open(facebookShareUrl, '_blank', 'width=600,height=400');
                });
                
                shareMenu.querySelector('.twitter-share').addEventListener('click', function(e) {
                    e.preventDefault();
                    const url = window.location.href || 'https://petmoji-app.vercel.app';
                    const text = 'Check out my pet\'s emotions translated by PetMoji!';
                    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                    window.open(twitterShareUrl, '_blank', 'width=600,height=400');
                });
                
                shareMenu.querySelector('.instagram-share').addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('To share on Instagram, please save the image first and upload it to your Instagram account.');
                });
                
                shareMenu.querySelector('.pinterest-share').addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 创建一个临时的隐藏图片元素，确保Pinterest可以抓取到图片
                    const tempImg = document.createElement('img');
                    tempImg.style.display = 'none';
                    tempImg.src = resultImage.src;
                    document.body.appendChild(tempImg);
                    
                    // 使用Pinterest官方推荐的分享URL格式
                    const url = window.location.href || 'https://petmoji-app.vercel.app';
                    const description = 'My pet\'s emotions translated by PetMoji!';
                    
                    // 使用Pinterest的官方分享URL格式
                    const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(tempImg.src)}&description=${encodeURIComponent(description)}`;
                    
                    // 打开Pinterest分享窗口
                    const pinterestWindow = window.open(pinterestShareUrl, 'pinterest-share-dialog', 'width=750,height=550,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
                    
                    // 检查窗口是否成功打开
                    if (pinterestWindow && pinterestWindow.focus) {
                        pinterestWindow.focus();
                    }
                    
                    // 清理临时图片元素
                    setTimeout(function() {
                        document.body.removeChild(tempImg);
                    }, 100);
                });
                
                // Show share menu
                document.body.appendChild(shareMenu);
                
                // Add event listener to close share menu
                shareMenu.querySelector('.close-share-menu').addEventListener('click', function() {
                    document.body.removeChild(shareMenu);
                });
            });
    });
    
    // Try again button click
    tryAgainButton.addEventListener('click', function() {
        resultsSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
        fileInput.value = '';
        selectedStyle = null;
        uploadedImage = null;
        
        // Reset style selection
        styleOptions.forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Reset progress
        progressBar.style.width = '10%';
        
        // Scroll to upload section
        uploadSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Change photo button
    const changePhotoButton = document.getElementById('change-photo');
    if (changePhotoButton) {
        changePhotoButton.addEventListener('click', function() {
            // Reset the file input
            fileInput.value = '';
            
            // Hide preview and show upload prompt
            previewContainer.classList.add('hidden');
            uploadPrompt.classList.remove('hidden');
            
            // Reset uploaded image
            uploadedImage = null;
            
            // Hide style section
            styleSection.classList.add('hidden');
        });
    }
    
    function resetApp() {
        // 重置应用状态
        document.getElementById('upload-section').classList.remove('hidden');
        document.getElementById('style-section').classList.add('hidden');
        document.getElementById('result-section').classList.add('hidden');
        
        // 清除预览图像
        previewImage.src = '#';
        
        // 重置选择的风格
        selectedStyle = '';
        document.querySelectorAll('.style-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // 重置宠物类型
        document.getElementById('pet-type-select').value = 'dog';
        
        // 重置情绪分析结果
        emotion = 'happy';
        
        // 清除结果图像
        resultImage.src = '#';
        
        // 重置进度条
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', '0');
        progressText.textContent = '0%';
    }
    
    // 设置结果页面事件监听器
    function setupResultPage() {
        // 返回按钮点击事件
        document.getElementById('back-to-start-btn').addEventListener('click', function() {
            resetApp();
        });
        
        // 下载按钮点击事件
        document.getElementById('download-btn').addEventListener('click', function() {
            if (resultImage.src && resultImage.src !== '#' && resultImage.src !== 'data:,') {
                const link = document.createElement('a');
                link.href = resultImage.src;
                link.download = `petmoji-${selectedStyle}-${Date.now()}.png`;
                link.click();
            }
        });
        
        // 分享按钮点击事件
        document.getElementById('share-btn').addEventListener('click', function() {
            if (resultImage.src && resultImage.src !== '#' && resultImage.src !== 'data:,') {
                if (navigator.share) {
                    fetch(resultImage.src)
                        .then(res => res.blob())
                        .then(blob => {
                            const file = new File([blob], `petmoji-${selectedStyle}-${Date.now()}.png`, { type: 'image/png' });
                            navigator.share({
                                title: 'My PetMoji',
                                text: 'Check out my pet\'s emotions translated into art!',
                                files: [file]
                            }).catch(console.error);
                        });
                } else {
                    alert('Web Share API is not supported in your browser. You can download the image instead.');
                }
            }
        });
        
        // 尝试新风格按钮点击事件
        document.getElementById('try-new-style-btn').addEventListener('click', function() {
            document.getElementById('result-section').classList.add('hidden');
            document.getElementById('style-section').classList.remove('hidden');
        });
    }
});
