const $ = require('jquery');
const env = require('./env');

const $body = $('body');
const $mobilePopup = $('header.header-desktop');
const $mobileHeader = $('header.header-mobile');
const $menuBtn = $mobileHeader.find('.header-mobile__hamberger');
const $languageSelectorBtn = $mobilePopup.find('.language-selector');
const $versionSelectorBtn = $mobilePopup.find('.version-selector');
const $languageMenu = $mobilePopup.find('.language-menu');
const $versionMenu = $mobilePopup.find('.version-menu');

const $bkMobileMenu = $mobilePopup.find('ul.header__menu').clone();
const $bkMenuLanguage = $languageMenu.clone();
const $bkMenuVersion = $versionMenu.clone();

const isMobileMenuOpen = () => {
  return $mobileHeader.hasClass('open');
}

const toggleMobileMenu = () => {
  if (isMobileMenuOpen()) {
    $mobileHeader.css('position', 'relative');
  }

  $mobileHeader.toggleClass('open');
  $mobilePopup.fadeToggle(300, () => {
    if (isMobileMenuOpen()) {
      $mobileHeader.css('position', 'fixed');
    }
  });
  $body.toggleClass('no-scrolling');
}

const toggleDesktopLanguageMenu = () => {
  const {top, left} = $languageSelectorBtn.position();
  const height = $languageSelectorBtn.outerHeight(true);

  $languageMenu.fadeToggle(100);

  $languageMenu.css({top: top + height, left: left - 47});
}

const toggleDesktopVersionMenu = () => {
  const {top, left} = $versionSelectorBtn.position();
  const height = $versionSelectorBtn.outerHeight(true);

  $versionMenu.fadeToggle(100);

  $versionMenu.css({top: top + height, left: left - 40});
}

const isMobileLanguageMenuOpened = () => {
  return $mobilePopup.find('ul.header__menu.select-language').length > 0;
}
const isMobileVersionMenuOpened = () => {
  return $mobilePopup.find('ul.header__menu.select-language').length > 0;
}

const getLanguageMenu = () => {
  return $bkMenuLanguage.clone()
    .removeClass('language-menu')
    .addClass('header__menu select-language')
    .css('display', 'block')
    .on('click', '.back', toggleMobileLanguageMenu);
}

const getVersionMenu = () => {
  return $bkMenuVersion.clone()
    .removeClass('version-menu')
    .addClass('header__menu select-version')
    .css('display', 'block')
    .on('click', '.back', toggleMobileVersionMenu);
}

const toggleMobileLanguageMenu = () => {
  const opened = isMobileLanguageMenuOpened();

  $mobilePopup
    .find('ul.header__menu')
    .fadeOut(100)
    .remove();

  const $newMenu = opened
    ? $bkMobileMenu
    : getLanguageMenu();

  $newMenu
    .css('display', 'none')
    .fadeIn(300);

  $mobilePopup
    .find('.header__logo')
    .after($newMenu);
}

const toggleMobileVersionMenu = () => {
  const opened = isMobileVersionMenuOpened();

  $mobilePopup
    .find('ul.header__menu')
    .fadeOut(100)
    .remove();

  const $newMenu = opened
    ? $bkMenuVersion
    : getVersionMenu();

  $newMenu
    .css('display', 'none')
    .fadeIn(300);

  $mobilePopup
    .find('.header__logo')
    .after($newMenu);
}

const toggleLanguageMenu = () => {
  if (env.isDesktop()) {
    toggleDesktopLanguageMenu();
  } else {
    toggleMobileLanguageMenu();
  }
}

const toggleVersionMenu = () => {
  if (env.isDesktop()) {
    toggleDesktopVersionMenu();
  } else {
    toggleMobileVersionMenu();
  }
}

const hideDesktopLanguageMenu = () => {
  if (env.isMobile()) {
    return;
  }

  $languageMenu.fadeOut(100);
}

const hideDesktopVersionMenu = () => {
  if (env.isMobile()) {
    return;
  }

  $versionMenu.fadeOut(100);
}

const checkToHideDesktopLanguageMenu = function (e) {
  if (env.isMobile()) {
    return;
  }

  const languageSelectorBtnClicked =
    $(e.target).closest($languageSelectorBtn).length > 0;

  if (!languageSelectorBtnClicked) {
    hideDesktopLanguageMenu();
  }
}

const checkToHideDesktopVersionMenu = function (e) {
  if (env.isMobile()) {
    return;
  }

  const versionSelectorBtnClicked =
    $(e.target).closest($versionSelectorBtn).length > 0;

  if (!versionSelectorBtnClicked) {
    hideDesktopVersionMenu();
  }
}

const registerEvents = () => {
  $menuBtn.on('click', toggleMobileMenu);
  $languageSelectorBtn.on('click', toggleLanguageMenu);
  $versionSelectorBtn.on('click', toggleVersionMenu);
  $(document).on('click', checkToHideDesktopLanguageMenu);
  $(document).on('click', checkToHideDesktopVersionMenu);
  $(window).on('resize scroll', hideDesktopLanguageMenu);
  $(window).on('resize scroll', hideDesktopVersionMenu);
}

module.exports = () => {
  registerEvents();
}
