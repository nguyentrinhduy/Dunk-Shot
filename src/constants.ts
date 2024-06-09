export const CONSTANT = {
    SPRITES: {

        PATH: 'assets/sprites/',

        BALLS: {
            KEY: 'balls',
            PATH: 'balls/',
            NUMBER: 78,
            RADIUS_BOUND: 100
        },

        LOCKED_BALL: {
            KEY: 'locked_ball',
            PATH: 'balls/locked_ball.png'
        },

        BASKETS: {
            COLLIDER: {
                LEFT: {
                    POSITION: {
                        X: -77,
                        Y: -41
                    },
                    RADIUS_BOUND: 10
                },
                RIGHT: {
                    POSITION: {
                        X: 88,
                        Y: -41
                    },
                    RADIUS_BOUND: 10
                }
            },
            ROUND_UP: {
                KEY: 'round_up',
                PATH: 'baskets/round_up.png',
                TINT: 0xca0000,
                POSITION: {
                    X: 0,
                    Y: -46,
                }
            },
            ROUND_DOWN: {
                KEY: 'round_down',
                PATH: 'baskets/round_down.png',
                TINT: 0xca0000,
                POSITION: {
                    X: 0,
                    Y: -46
                }
            },
            NET: {
                KEY: 'net',
                PATH: 'baskets/net.png',
                TINT: 0xffffff,
                POSITION: {
                    X: 0,
                    Y: 0
                }
            }
        },

        EFFECTS: {

        },

        COMPONENTS: {

            SPINS: {

            },
    
            TEXTS: {
                DRAG_IT: {
                    KEY: 'drag_it',
                    PATH: 'components/texts/drag_it.png'
                }
            },

            BUTTONS: {
                ORANGE_BACKGROUND: {
                    KEY: 'orange_background',
                    PATH: 'components/buttons/orange_background.png'
                },
                SETTINGS: {
                    KEY: 'settings',
                    PATH: 'components/buttons/settings.png'
                },
                CHALLENGES: {
                    KEY: 'challenge_button',
                    PATH: 'components/buttons/challenge.png'
                }
            },

            ICONS: {
                ORANGE_BALL_ICON: {
                    KEY: 'orange_ball_icon',
                    PATH: 'components/icons/orange_ball_icon.png'
                },
                STARS: {
                    KEY: 'stars',
                    PATH: 'components/icons/stars.png'
                }
            },
            LOGO: {
                KEY: 'logo',
                PATH: 'components/logo.png'
            }
            
        },

    },

    SOUNDS: {

        PATH: 'assets/sounds'

    },

    BOOT_SCENE: {

        BACKGROUND_KEY: 'background'

    },

    PRELOAD_SCENE: {

        LOGO: {
            POSITION: {
                X: 350,
                Y: 300
            },
            KEY: 'logo',
            SCALE: 0.7
        },

        PROGRESS_BAR: {
            TEXT: {
                SIZE: 30,
                FONTS: 30,
            },
            BOX: {
                POSITION: {
                    X: 512,
                    Y: 384
                },
                SIZE: {
                    WIDTH: 468,
                    HEIGHT: 32
                },
                STROKE_STYLE: {
                    LINE_WIDTH: 1,
                    COLOR: 0xffffff
                }
            },
            BAR: {
                POSITION: {
                    X: 300,
                    Y: 384
                },
                SIZE: {
                    WIDTH: 4,
                    HEIGHT: 28
                },
                COLOR: 0xffffff
            }
        },
        BACKGROUND: 100
    },

    MAIN_MENU_SCENE: {
        
        BUTTONS: {
            BALL_SKINS: {
                BACKGROUND: {
                    KEY: 'orange_background',
                    POSITION: {
                        X: 0,
                        Y: 0
                    }
                },

                IMAGE: {
                    KEY: 'orange_ball_icon',
                    SCALE: 1.3,
                    POSITION: {
                        X: 0,
                        Y: -25
                    }
                },

                TEXT: {
                    CONTENT: 'CUSTOMIZE',
                    POSITION: {
                        X: -50,
                        Y: 20
                    }
                },

                POSITION: {
                    X: 400,
                    Y: 800
                }
            },

            SETTINGS: {
                BACKGROUND_KEY: 'settings',
                POSITION: {
                    X: 40,
                    Y: 40
                }
            },

            CHALLENGE: {
                BACKGROUND_KEY: 'challenge_button',
                TEXT: {
                    CONTENT: 'CHALLENGES',
                    POSITION: {
                        X: -50,
                        Y: 20
                    }
                },
                POSITION: {
                    X: 600,
                    Y: 800
                }
            },

        },

        ICONS: {
            STARS: {
                KEY: 'stars',
                POSITION: {
                    X: 350,
                    Y: 60
                }
            },
            LOGO: {
                POSITION: {
                    X: 350,
                    Y: 300
                },
                KEY: 'logo',
                SCALE: 0.7
            }
        },

        TEXT: {
            STARS_OBJECT: {
                POSITION: {
                    X: 400,
                    Y: 60,
                }
            },
        }
    },
    
    PLAYING_GAME_SCENE: {
        BALL: {
            START_POSITION: {
                X: 270,
                Y: 500
            },
            SCALE: 0.5
        },
        BASKET: {

        },
        GRAVITY: 1500
    },

    GAME_OVER_SCENE: {

    }
}