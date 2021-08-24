const eventRegister = require('./eventRegister');
const footerLinks = require('./data/footerLinks.json');
const roadmap = require('./data/roadmap.json');
const header = require('./data/header.json');
const pageLinks = require('./data/pageLinks.json');

module.exports = {
  baseUrl: 'https://bsx.fi',
  baseContext: '',
  siteName: 'Basilisk',
  siteDescription: 'Liquidity Protocol Built for Kusama',
  dateTimeFormat: 'ddd, MM/DD/YYYY - HH:mm',
  dateFormat: 'MM/DD/YYYY',
  postUrlStyle: 'POSTS_SLUG',
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  eventRegister,
  footerLinks,
  roadmap,
  header,
  pageLinks
};
