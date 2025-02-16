/**
 * Enhanced Smooth Scroll Functionality
 * Version 2.1
 * Last Updated: 2024-02-25
 */

$(function() {
    // 配置参数
    const scrollSettings = {
        scrollDuration: 800,
        offset: 72, // 根据导航栏高度调整
        easing: 'swing'
    };

    // 主滚动函数
    function smoothScroll(target, settings) {
        const $target = $(target);
        if (!$target.length) return;

        const targetPos = $target.offset().top - settings.offset;
        
        $('html, body').stop().animate(
            { scrollTop: targetPos },
            settings.scrollDuration,
            settings.easing,
            () => history.replaceState(null, null, target)
        );
    }

    // 事件委托处理所有导航点击
    $(document).on('click', '.nav-link[href*="#"]', function(e) {
        const hash = this.hash;
        if (!hash || hash === '#') return;
        
        e.preventDefault();
        smoothScroll(hash, scrollSettings);
        
        // 自动折叠移动端菜单
        const $navbar = $('#navbarSupportedContent');
        if ($navbar.hasClass('show')) {
            $navbar.collapse('hide');
        }
    });

    // 页面加载时处理hash
    if (window.location.hash) {
        smoothScroll(window.location.hash, {
            ...scrollSettings,
            scrollDuration: 1200
        });
    }

    // 滚动时更新导航状态
    let lastId;
    const $sections = $('section');
    
    $(window).scroll(function() {
        const fromTop = $(this).scrollTop() + scrollSettings.offset;
        
        const cur = $sections.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        }).last().get(0);

        if (cur && cur.id !== lastId) {
            lastId = cur.id;
            $('.nav-link').removeClass('active');
            $(`.nav-link[href="#${cur.id}"]`).addClass('active');
        }
    });
});