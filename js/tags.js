$(document).ready(function () {
    const divs = $('.section');
    const tagsWrapper = $('#tags-ul');

    for (let i = 1; i <= divs.length; i++) {
        const tag = "'tag" + i + "'";
        const activeClass = i === 1 ? " class='active'" : '';
        tagsWrapper.append("<li id=" + tag + activeClass  +" ></li>");
    }

});