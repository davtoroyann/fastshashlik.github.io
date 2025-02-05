// Header Burger menu
const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuIcon = document.querySelector('.burger-menu__icon');
const menuBody = document.querySelector('.menu');
const logo = document.getElementById('logo');
const basket = document.getElementById('basket');
const search = document.getElementById('search');
const signUp = document.getElementById('signUp');

if (burgerMenuIcon) {
    burgerMenuIcon.addEventListener('click', (e) => {
        document.body.classList.toggle('__lock');
        burgerMenuIcon.classList.toggle('__cross');
        burgerMenu.classList.toggle('__anim-stop');
        menuBody.classList.toggle('__active');
        
        if (burgerMenuIcon.classList.contains('__cross')) {
            setTimeout(() => {
                logo.src = 'img/header/logo2.svg';
                basket.src = 'img/header/basket2.svg';
                signUp.src = 'img/header/user2.svg';
            }, 300);
        } else {
            setTimeout(() => {
                logo.src = 'img/header/logo1.svg';
                basket.src = 'img/header/basket1.svg';
                signUp.src = 'img/header/user1.svg';
            }, 300);
        }
    });
} else {
    logo.src = 'img/header/logo1.svg';
    basket.src = 'img/header/basket1.svg';
    search.src = 'img/header/search1.svg';
}
// Menu Block Items Height   
window.onload = function() {
    const menuTitles = document.querySelectorAll('.item-menu__title');
    const menuDesc = document.querySelectorAll('.item-menu__desc');
    const newsTexts = document.querySelectorAll('.item-news__text');
    const menuItems = document.querySelectorAll('.item-menu');
    const newsItems = document.querySelectorAll('.item-news');
    const delivItems = document.querySelectorAll('.block-deliv');
    const menuBar = document.querySelector('.bar-catalog');
    const menuBody = document.querySelector('.body-catalog');
    const boxCatalogFrameItems = document.querySelectorAll('.box-catalog__frame .item-menu');

    // Функция для установки одинаковой высоты
    function setHeight(elements) {
        if (!elements.length) return; // Проверяем наличие элементов

        let maxHeight = 0;
        elements.forEach(card => {
            card.style.minHeight = 'auto';
            const cardHeight = card.offsetHeight;
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });

        elements.forEach(card => {
            card.style.minHeight = maxHeight + 'px';
        });
    }

    // Функция для сброса высоты
    function resetHeight(elements) {
        if (!elements.length) return; // Проверяем наличие элементов

        elements.forEach(card => {
            card.style.minHeight = 'auto';
        });
    }

    // Настройка высоты элементов в зависимости от ширины окна
    function adjustHeights() {
        if (window.innerWidth >= 480) {
            setHeight(menuTitles);
            setHeight(menuDesc);
        } else {
            resetHeight(menuTitles);
            resetHeight(menuDesc);
        }

        if (window.innerWidth >= 991) {
            setHeight(newsTexts);
            setHeight(delivItems);
        } else {
            resetHeight(newsTexts);
            resetHeight(delivItems);
        }
    }

    // Функция для установки одинаковой ширины
    function setEqualWidths(elements) {
        if (!elements.length) return; // Проверяем наличие элементов

        let maxWidth = 0;
        elements.forEach(card => {
            card.style.width = 'auto';
            const cardWidth = card.offsetWidth;
            if (cardWidth > maxWidth) {
                maxWidth = cardWidth;
            }
        });

        elements.forEach(card => {
            card.style.width = `${maxWidth}px`;
        });
    }

    // Наблюдение за изменением DOM для корректировки размеров
    const observerConfig = { childList: true, subtree: true, characterData: true };
    const mutationObserver = new MutationObserver(() => {
        adjustHeights();
        setEqualWidths(boxCatalogFrameItems);
    });

    [...menuItems, ...newsItems, ...delivItems].forEach(item => {
        if (item) {
            mutationObserver.observe(item, observerConfig);
        }
    });

    adjustHeights();
    setEqualWidths(boxCatalogFrameItems);

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        adjustHeights();
        setEqualWidths(boxCatalogFrameItems);
    });

    // Наблюдение за изменением размеров меню
    if (menuBody && menuBar) {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                menuBar.style.height = `${entry.contentRect.height}px`;
            }
            if (window.innerWidth <= 767) {
                menuBar.style.height = "auto";
            }
        });
        resizeObserver.observe(menuBody);
    }

    // Наблюдение за изменением ширины элементов в каталоге
    const catalogResizeObserver = new ResizeObserver(() => {
        setEqualWidths(boxCatalogFrameItems);
    });

    boxCatalogFrameItems.forEach(item => {
        catalogResizeObserver.observe(item);
    });
};

// Motorcycle Animation 
document.addEventListener('DOMContentLoaded', function() {
    const motorcycle = document.getElementById('motorcycle');
    const motorcycleCon = document.querySelector('.motorcycle__container');

    if(motorcycle) {
        motorcycle.addEventListener('animationend', () => {
            motorcycleCon.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            setTimeout(() => {
                motorcycleCon.style.display = 'none';
            }, 1000);
        });
    }
    
})
// Tabs in Sweet Block
const tabsBtn = document.querySelectorAll('.tabs-menu__item');
const tabsContent = document.querySelectorAll('.body-menu__content');

tabsBtn.forEach((tab, index) => {
    tab.addEventListener('click', function() {
        tabsBtn.forEach(tab => (tab.classList.remove('tab-on')))
        tab.classList.add('tab-on');

        tabsContent.forEach(content => {content.classList.remove('tab-on')})
        tabsContent[index].classList.add('tab-on');
    })
})
// Poster Hide and Show
document.addEventListener('DOMContentLoaded', function() {
    const videoCon = document.querySelector('.fast__video');
    const video = document.querySelector('.video');
    const poster = document.querySelector('.poster');

    if(poster) {
        poster.addEventListener('click', () => {
            poster.classList.add('poster-hide');
            videoCon.classList.add('playing');
            setTimeout(() => {
                video.play();
            }, 100);
        });
        video.addEventListener('ended', () => {
            setTimeout(() => {
                poster.classList.remove('poster-hide');
                videoCon.classList.remove('playing');
            }, 75)
        });
        video.addEventListener('pause', () => {
            videoCon.classList.remove('playing');
        })
        video.addEventListener('play', () => {
            videoCon.classList.add('playing');
        })
    }
})
// Parallax Effect 
document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainers = document.querySelectorAll('.about, .delivery');

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xOffset = (clientX / innerWidth - 0.5) * 80;
        const yOffset = (clientY / innerHeight - 0.5) * 80;
        if(parallaxContainers) {
            parallaxContainers.forEach(parallaxContainer => {
                parallaxContainer.style.backgroundPosition = `${50 + xOffset}% ${50 + yOffset}%`;
            });
        }
    });
});
// Tabs for Menu in menu.html File
const barTabs = document.querySelectorAll('.bar-catalog__item button');
const barBox = document.querySelectorAll('.box-catalog');

barTabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
        barTabs.forEach(tab => {tab.classList.remove('menutab-on')})
        tab.classList.add('menutab-on');

        barBox.forEach(content => {content.classList.remove('menutab-on')})
        barBox[index].classList.add('menutab-on');
    })
    
})
// Tabs for Menu in menu.html File at 767px ( Menu Open/Close Btn )
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.bar-catalog__title');
    const menuList = document.querySelector('.bar-catalog__list');
    const menuLink = document.querySelectorAll('.bar-catalog__item button');

    if(menuBtn) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('menu-on');
            if(menuBtn.classList.contains('menu-on')) {
                menuList.classList.add('menu-on');
            } else {
                menuList.classList.remove('menu-on');
            }
            
            menuLink.forEach((link) => {
                link.addEventListener('click', function() {
                    if(menuList.classList.contains('menu-on')) {
                        menuList.classList.remove('menu-on');
                        menuBtn.classList.remove('menu-on');
                    }
                })
            })
        })
    }
});
// Contacts Form Number Warning
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactsForm');
    const phoneInput = document.getElementById('number');
    const phoneInputWarn = document.querySelector('.right-contacts__form-number span');

    if(form) {
        form.addEventListener('submit', function(event) {
            const phoneValue = phoneInput.value;
            console.log(phoneValue);
    
            if (!phoneValue.startsWith('+')) {
                phoneInputWarn.classList.add('active');
                event.preventDefault();
            }
        });
        phoneInput.addEventListener('input', function() {
            if(phoneInputWarn.classList.contains('active')) {
                phoneInputWarn.classList.remove('active');
            }
        });
    }
    
});

// Tabs for personal.html
document.addEventListener('DOMContentLoaded', function() {
    const panelTabs = document.querySelectorAll('.item-panel');
    const panelContent = document.querySelectorAll('.content-personal__body');
    
    const defaultImages = {
        'account': 'img/personal/account.svg',
        'order': 'img/personal/order.svg',
        'pass-change': 'img/personal/lock.svg'
    };

    const hoverImages = {
        'account': 'img/personal/accountRed.svg',
        'order': 'img/personal/orderRed.svg',
        'pass-change': 'img/personal/lockRed.svg'
    };

    if (panelTabs) {
        panelTabs.forEach((tab, index) => {
            const tabType = tab.dataset.type;

            tab.addEventListener('click', function() {
                panelTabs.forEach(tab => {
                    tab.classList.remove('tab-on');
                    const icon = tab.querySelector('.item-panel__icon img');
                    if (icon && defaultImages[tab.dataset.type]) {
                        icon.src = defaultImages[tab.dataset.type];
                    }
                });

                tab.classList.add('tab-on');
                panelContent.forEach(content => content.classList.remove('con-on'));
                panelContent[index].classList.add('con-on');

                const icon = tab.querySelector('.item-panel__icon img');
                if (icon && hoverImages[tabType]) {
                    icon.src = hoverImages[tabType];
                }
            });

            tab.addEventListener('mouseover', function() {
                const icon = tab.querySelector('.item-panel__icon img');
                if (icon && hoverImages[tabType] && !tab.classList.contains('tab-on')) {
                    icon.src = hoverImages[tabType];
                }
            });

            tab.addEventListener('mouseout', function() {
                const icon = tab.querySelector('.item-panel__icon img');
                if (icon && defaultImages[tabType] && !tab.classList.contains('tab-on')) {
                    icon.src = defaultImages[tabType];
                }
            });
        });

        const firstTab = panelTabs[0];
        firstTab.classList.add('tab-on');
        const firstIcon = firstTab.querySelector('.item-panel__icon img');
        if (firstIcon && hoverImages[firstTab.dataset.type]) {
            firstIcon.src = hoverImages[firstTab.dataset.type];
        }
        panelContent[0].classList.add('con-on');
    }
});

// personal.html Save Btn 
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.querySelector('.content-personal__change-btn');
    const saveBtnImage = document.querySelector('.content-personal__change-btn img')
    if(saveBtn) {
        saveBtn.addEventListener('mouseover', function() {
            saveBtnImage.src = 'img/personal/changeRed.svg';
        })
        saveBtn.addEventListener('mouseout', function() {
            saveBtnImage.src = 'img/personal/change.svg';
        })
    }
});

// personal.html order history order detail btn
document.addEventListener('DOMContentLoaded', function() {
    const orderBtn = document.querySelectorAll('.order-item__detail button');
    const orderBtnImage = document.querySelectorAll('.order-item__detail button img');

    if (orderBtn) {
        orderBtn.forEach((btn, index) => {
            btn.addEventListener('mouseover', function() {
                orderBtnImage[index].src = 'img/personal/detailRed.svg';
            })
            btn.addEventListener('mouseout', function() {
                orderBtnImage[index].src = 'img/personal/detail.svg';
            })
        })
        
    }
})

// personal.html single order modal menu
document.addEventListener('DOMContentLoaded', function() {
    const detailBtn = document.querySelectorAll('.order-item__detail button');
    const detailModal = document.querySelector('.detail-menu');
    const detailClose = document.querySelector('.detail-menu__close-btn');

    if(detailBtn) {
        detailBtn.forEach((detail) => {
            detail.addEventListener('click', function() {
                detailModal.classList.add('modal-on');
            })
        })
    }
    if(detailClose) {
        detailClose.addEventListener('click', function() {
            detailModal.classList.remove('modal-on');
        })
    }
})


