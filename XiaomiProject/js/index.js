// 导航栏js部分
(function () {
    // 获取导航栏
    let header = document.querySelector('.header')
    // 获取菜单栏
    let menu = document.querySelector('.menu')
    // 获取登录栏
    let loginMenu = document.querySelector('.login-menu')
    // 获取菜单栏响应按钮
    let menuClick = document.querySelector('.icon-memu')
    // 获取登录菜单栏响应按钮
    let loginClick = document.querySelector('.icon-user')

    // 菜单栏按钮点击事件
    menuClick.addEventListener('click', () => {
        // 清除login事件样式影响
        loginMenu.classList.remove('menu-active')
        loginClick.classList.remove('icon-close')

        // 呼叫menu菜单栏
        menu.classList.toggle('menu-active')
        // 切换成 X 图形
        menuClick.classList.toggle('icon-close')

        menuChange()
    })

    // 登录菜单栏按钮点击事件
    loginClick.addEventListener('click', () => {
        // 清除menu事件样式影响
        menu.classList.remove('menu-active')
        menuClick.classList.remove('icon-close')

        loginMenu.classList.toggle('menu-active')
        loginClick.classList.toggle('icon-close')
        menuChange()
    })

    header.addEventListener('transitionend', () => {
        header.style.transition = ''
    })

    // 菜单栏关闭前后
    function menuChange() {
        if (menuClick.classList.contains('icon-close') || loginClick.classList.contains('icon-close')) {
            // 导航栏背景变黑
            header.classList.add('header-active')
        } else {
            header.classList.remove('header-active')
            // 实现关闭时header有过渡
            header.style.transition = 'background-color 0.4s'
        }
    }

    // 导航栏随着下滑的背景色变透明
    window.addEventListener('scroll', () => {
        header.style.transition = 'background-color 0.4s'
        if (document.documentElement.scrollTop !== 0) {
            if (menuClick.classList.contains('icon-close') || loginClick.classList.contains('icon-close')) {
                return
            } else {
                header.style.backgroundColor = 'rgba(0,0,0,.85)'
            }
        } else {
            header.style.backgroundColor = ''
        }
    })
}());

// 轮播图js部分
(function () {
    // 获取imgboxs
    let imgboxs = document.querySelector('.content-banner .imgboxs')
    let count = 0
    // 用来开启循环
    let timer = null
    
    // 鼠标进入imgboxs停止循环播放
    imgboxs.addEventListener('mouseenter',()=>{
        clearInterval(timer)
    })
    // 鼠标进入imgboxs开启循环播放
    imgboxs.addEventListener('mouseleave',()=>{
        autoplay()
    })

    // 实现从左到右进图片的效果
    imgboxs.addEventListener('transitionend',()=>{
        if(count ===4){
            imgboxs.style.transition=''
            imgboxs.style.left='0%'
            count=1
        }
    })

    // 循环播放函数
    function autoplay() {
        timer=setInterval(() => {
            imgboxs.style.transition='all 0.4s'
            imgboxs.style.left=`-${count}00%`
            count++;
        }, 2000); 
    }
    autoplay()

    // 用来切换页面避免影响setInterval
    // document.addEventListener('visibilitychange',function () {
    //     if (document.visibilityState === 'visible') {
    //         autoplay()
    //     }else{
    //         clearInterval(timer)
    //     }
    // })
}());





