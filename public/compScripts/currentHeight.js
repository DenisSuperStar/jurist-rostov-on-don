const browserHeight = document.documentElement.clientHeight;
const tabContent = $('#tabContent');
tabContent.attr('style', 'height: ' + `${browserHeight - 200}` + 'px');