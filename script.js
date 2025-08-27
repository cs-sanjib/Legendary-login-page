// Enhanced audio system with personalized audio files
        class AudioManager {
            constructor() {
                this.vineBoomAudio = null;
                this.ahhSoundAudio = null;
                this.yameteKudasaiAudio = null;
                this.initialized = false;
            }

            async init() {
                if (this.initialized) return;
                
                try {
                    // Initialize your personalized audio files
                    this.vineBoomAudio = new Audio('vine-boom.mp3'); // For typing sounds
                    this.ahhSoundAudio = new Audio('ahh-sound.mp3'); // For success sound
                    this.yameteKudasaiAudio = new Audio('yamete-kudasai.mp3'); // For error sound
                    
                    // Configure audio settings
                    this.vineBoomAudio.volume = 0.3; // Reduced volume for typing
                    this.ahhSoundAudio.volume = 0.7; // Success celebration
                    this.yameteKudasaiAudio.volume = 0.6; // Error feedback
                    
                    // Preload audio files
                    this.vineBoomAudio.preload = 'auto';
                    this.ahhSoundAudio.preload = 'auto';
                    this.yameteKudasaiAudio.preload = 'auto';
                    
                    this.initialized = true;
                    console.log('Custom audio files loaded successfully (including yamete-kudasai.mp3)');
                } catch (error) {
                    console.log('Custom audio initialization failed:', error);
                }
            }

            playKeyPress() {
                if (!this.initialized || !this.vineBoomAudio) return;
                
                try {
                    // Reset audio to beginning and play
                    this.vineBoomAudio.currentTime = 0;
                    this.vineBoomAudio.play().catch(e => {
                        console.log('Vine boom sound failed to play:', e);
                    });
                } catch (error) {
                    console.log('Error playing vine boom sound:', error);
                }
            }

            playSuccess() {
                if (!this.initialized || !this.ahhSoundAudio) return;
                
                try {
                    // Reset audio to beginning and play
                    this.ahhSoundAudio.currentTime = 0;
                    this.ahhSoundAudio.play().catch(e => {
                        console.log('Ahh sound failed to play:', e);
                    });
                } catch (error) {
                    console.log('Error playing ahh sound:', error);
                }
            }

            playError() {
                if (!this.initialized || !this.yameteKudasaiAudio) return;
                
                try {
                    // Reset audio to beginning and play yamete-kudasai sound
                    this.yameteKudasaiAudio.currentTime = 0;
                    this.yameteKudasaiAudio.play().catch(e => {
                        console.log('Yamete-kudasai sound failed to play:', e);
                        // Fallback to vine boom if yamete-kudasai fails
                        this.playKeyPress();
                    });
                } catch (error) {
                    console.log('Error playing yamete-kudasai sound:', error);
                    // Fallback to vine boom sound
                    this.playKeyPress();
                }
            }
        }

        // Initialize enhanced UI
        document.addEventListener('DOMContentLoaded', function() {
            const audioManager = new AudioManager();
            const loginForm = document.getElementById('loginForm');
            const loginButton = document.getElementById('loginButton');
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');

            // Create floating orbs
            createFloatingOrbs();

            // Initialize audio on first user interaction
            document.addEventListener('click', () => audioManager.init(), { once: true });

            // Enhanced typing effects
            function addEnhancedTypingEffects(input) {
                input.addEventListener('input', function(e) {
                    audioManager.playKeyPress();
                    
                    // Add subtle scale animation
                    this.style.transform = 'scale(1.01)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                });

                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'translateY(-2px)';
                });

                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'translateY(0)';
                });
            }

            addEnhancedTypingEffects(usernameInput);
            addEnhancedTypingEffects(passwordInput);

            // Enhanced form validation
            function showError(message) {
                errorMessage.textContent = message;
                errorMessage.classList.add('show');
                audioManager.playError();
                
                // Shake animation for the container
                const container = document.querySelector('.login-container');
                container.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    container.style.animation = '';
                }, 500);
            }

            function hideError() {
                errorMessage.classList.remove('show');
            }

            // Add shake animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0) translateY(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) translateY(0); }
                    20%, 40%, 60%, 80% { transform: translateX(5px) translateY(0); }
                }
            `;
            document.head.appendChild(style);

            // Enhanced form submission
            loginForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                hideError();
                
                const username = usernameInput.value.trim();
                const password = passwordInput.value.trim();
                
                // Input validation
                if (!username) {
                    showError('Please enter your username');
                    usernameInput.focus();
                    return;
                }
                
                if (!password) {
                    showError('Please enter your password');
                    passwordInput.focus();
                    return;
                }

                // Show loading state
                loginButton.disabled = true;
                loginButton.classList.add('button-loading');
                
                // Simulate authentication delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Check credentials (default: admin / CorrectHorse%53&u)
                if (username.toLowerCase() === 'admin' && password === 'CorrectHorse%53&u') {
                    audioManager.playSuccess();
                    
                    // Success animation sequence
                    successMessage.style.display = 'block';
                    
                    // Add confetti effect
                    createConfetti();
                    
                    // Reset form after success
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        loginForm.reset();
                        loginButton.disabled = false;
                        loginButton.classList.remove('button-loading');
                    }, 3000);
                } else {
                    showError('Invalid credentials. Try admin / CorrectHorse%53&u');
                    loginButton.disabled = false;
                    loginButton.classList.remove('button-loading');
                }
            });
        });

        // Create floating orbs
        function createFloatingOrbs() {
            const orbsContainer = document.querySelector('.floating-orbs');
            const orbCount = 8;

            for (let i = 0; i < orbCount; i++) {
                const orb = document.createElement('div');
                orb.className = 'orb';
                
                // Random size
                const size = Math.random() * 60 + 20;
                orb.style.width = size + 'px';
                orb.style.height = size + 'px';
                
                // Random position
                orb.style.left = Math.random() * 100 + '%';
                orb.style.top = Math.random() * 100 + '%';
                
                // Random animation delay
                orb.style.animationDelay = Math.random() * 15 + 's';
                
                // Random animation duration
                orb.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                orbsContainer.appendChild(orb);
            }
        }

        // Confetti effect for success
        function createConfetti() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
            const confettiCount = 50;
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.opacity = Math.random() * 0.8 + 0.2;
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                
                document.body.appendChild(confetti);
                
                // Animate confetti fall
                const animation = confetti.animate([
                    { 
                        transform: `translateY(-10px) rotate(0deg)`,
                        opacity: confetti.style.opacity 
                    },
                    { 
                        transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`,
                        opacity: 0 
                    }
                ], {
                    duration: Math.random() * 2000 + 2000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                animation.onfinish = () => confetti.remove();
            }
        }