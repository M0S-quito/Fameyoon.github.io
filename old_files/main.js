
document.addEventListener('DOMContentLoaded', function() {
    // 헤더 모달 요소들
    const headerMyPostsModal = document.getElementById('headerMyPostsModal');
    const headerNotificationModal = document.getElementById('headerNotificationModal');
    const closeHeaderMyPostsModal = document.getElementById('closeHeaderMyPostsModal');
    const closeHeaderNotificationModal = document.getElementById('closeHeaderNotificationModal');
    
    // 필터 체크박스
    const filterPosts = document.getElementById('filterPosts');
    const filterComments = document.getElementById('filterComments');
    
    // 내가 쓴 글 모달 열기/닫기
    window.openHeaderMyPostsModal = function() {
        headerMyPostsModal.style.display = 'flex';
        setTimeout(() => headerMyPostsModal.classList.add('show'), 10);
        loadHeaderMyContent();
    };
    
    window.closeHeaderMyPostsModalFunc = function() {
        headerMyPostsModal.classList.remove('show');
        setTimeout(() => headerMyPostsModal.style.display = 'none', 300);
    };
    
    // 알림 모달 열기/닫기
    window.openHeaderNotificationModal = function() {
        headerNotificationModal.style.display = 'flex';
        setTimeout(() => headerNotificationModal.classList.add('show'), 10);
        loadHeaderNotifications();
    };
    
    window.closeHeaderNotificationModalFunc = function() {
        headerNotificationModal.classList.remove('show');
        setTimeout(() => headerNotificationModal.style.display = 'none', 300);
    };
    
    // 모달 닫기 버튼 이벤트
    if (closeHeaderMyPostsModal) {
        closeHeaderMyPostsModal.addEventListener('click', window.closeHeaderMyPostsModalFunc);
    }
    
    if (closeHeaderNotificationModal) {
        closeHeaderNotificationModal.addEventListener('click', window.closeHeaderNotificationModalFunc);
    }
    
    // 모달 외부 클릭 시 닫기
    headerMyPostsModal.addEventListener('click', function(e) {
        if (e.target === headerMyPostsModal) {
            window.closeHeaderMyPostsModalFunc();
        }
    });
    
    headerNotificationModal.addEventListener('click', function(e) {
        if (e.target === headerNotificationModal) {
            window.closeHeaderNotificationModalFunc();
        }
    });
    
    // 필터 변경 시 콘텐츠 다시 로드
    if (filterPosts) {
        filterPosts.addEventListener('change', () => loadHeaderMyContent(1));
    }
    if (filterComments) {
        filterComments.addEventListener('change', () => loadHeaderMyContent(1));
    }
    
    // 전역 변수로 현재 페이지 추적
    let headerCurrentPage = 1;
    let headerTotalPages = 1;
    
    // 내가 쓴 글 로드 함수
    function loadHeaderMyContent(page = 1) {
        const contentList = document.getElementById('myContentList');
        const loading = document.getElementById('contentLoading');
        const emptyState = document.getElementById('emptyState');
        const filterInfo = document.getElementById('filterInfo');
        const filterCount = document.getElementById('filterCount');
        const filterPosts = document.getElementById('filterPosts');
        const filterComments = document.getElementById('filterComments');
        const paginationContainer = document.getElementById('paginationContainer');
        
        headerCurrentPage = page;
        
        console.log('요소 확인:', {
            contentList: !!contentList,
            loading: !!loading,
            emptyState: !!emptyState
        });
        
        // 요소 존재 확인
        if (!contentList) {
            console.error('myContentList 요소를 찾을 수 없습니다');
            return;
        }
        
        // 로딩 요소가 없으면 생성
        if (!loading) {
            const newLoading = document.createElement('div');
            newLoading.id = 'contentLoading';
            newLoading.className = 'loading-container';
            newLoading.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <p class="loading-text">불러오는 중...</p>
            `;
            contentList.appendChild(newLoading);
        }
        
        const loadingElement = loading || document.getElementById('contentLoading');
        
        // 로딩 표시
        loadingElement.style.display = 'flex';
        if (emptyState) emptyState.style.display = 'none';
        if (filterInfo) filterInfo.style.display = 'none';
        if (paginationContainer) paginationContainer.style.display = 'none';
        
        // 기존 콘텐츠 제거
        while (contentList.firstChild) {
            if (contentList.firstChild.id !== 'contentLoading') {
                contentList.removeChild(contentList.firstChild);
            } else {
                break;
            }
        }
        
        // 필터 상태 가져오기
        const showPosts = filterPosts ? filterPosts.checked : true;
        const showComments = filterComments ? filterComments.checked : true;
        
        console.log('필터 상태:', { showPosts, showComments });
        
        // 필터가 모두 해제된 경우
        if (!showPosts && !showComments) {
            loadingElement.style.display = 'none';
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = '게시글 또는 댓글 중 하나 이상을 선택해주세요.';
            contentList.appendChild(noResults);
            return;
        }
        
        // API 호출
        fetch(`/includes/header_modal_api.php?action=get_my_content&posts=${showPosts}&comments=${showComments}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                // 로딩 제거
                loadingElement.style.display = 'none';
                
                // 기존 콘텐츠 모두 제거
                contentList.innerHTML = '';
                
                if (data.error) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'text-center text-danger';
                    errorDiv.textContent = data.error;
                    contentList.appendChild(errorDiv);
                    return;
                }
                
                console.log('받은 데이터:', data);
                
                if (!data.data || data.data.length === 0) {
                    // emptyState가 없으면 새로 생성
                    if (!emptyState) {
                        const newEmptyState = document.createElement('div');
                        newEmptyState.className = 'empty-state';
                        newEmptyState.id = 'emptyState';
                        newEmptyState.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                            <p>작성한 글이 없습니다.</p>
                        `;
                        contentList.appendChild(newEmptyState);
                    } else {
                        emptyState.style.display = 'flex';
                        contentList.appendChild(emptyState);
                    }
                } else {
                    // 필터 정보 표시
                    if (filterInfo && filterCount) {
                        filterInfo.style.display = 'flex';
                        filterCount.textContent = data.total || data.data.length;
                    }
                    
                    // 콘텐츠 표시
                    data.data.forEach(item => {
                        const contentItem = createHeaderContentItem(item);
                        contentList.appendChild(contentItem);
                    });
                    
                    // 페이지네이션 표시
                    if (data.total > 20 && paginationContainer) {
                        headerTotalPages = Math.ceil(data.total / 20);
                        createHeaderPagination(headerCurrentPage, headerTotalPages);
                        paginationContainer.style.display = 'flex';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                loadingElement.style.display = 'none';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'text-center text-danger';
                errorDiv.textContent = '데이터를 불러오는 중 오류가 발생했습니다.';
                contentList.appendChild(errorDiv);
            });
    }
    
    // 페이지네이션 생성 함수
    function createHeaderPagination(currentPage, totalPages) {
        const paginationContainer = document.getElementById('paginationContainer');
        if (!paginationContainer) return;
        
        paginationContainer.innerHTML = '';
        
        // 이전 버튼
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.innerHTML = '이전';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => loadHeaderMyContent(currentPage - 1);
        paginationContainer.appendChild(prevBtn);
        
        // 페이지 번호 버튼들
        const maxVisible = 5; // 한 번에 보여줄 최대 페이지 수
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        // 시작 페이지 조정
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        // 첫 페이지와 점점점
        if (startPage > 1) {
            const firstBtn = document.createElement('button');
            firstBtn.className = 'pagination-btn';
            firstBtn.textContent = '1';
            firstBtn.onclick = () => loadHeaderMyContent(1);
            paginationContainer.appendChild(firstBtn);
            
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.className = 'pagination-dots';
                dots.textContent = '...';
                paginationContainer.appendChild(dots);
            }
        }
        
        // 페이지 번호들
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-btn';
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.textContent = i;
            pageBtn.onclick = () => loadHeaderMyContent(i);
            paginationContainer.appendChild(pageBtn);
        }
        
        // 마지막 페이지와 점점점
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.className = 'pagination-dots';
                dots.textContent = '...';
                paginationContainer.appendChild(dots);
            }
            
            const lastBtn = document.createElement('button');
            lastBtn.className = 'pagination-btn';
            lastBtn.textContent = totalPages;
            lastBtn.onclick = () => loadHeaderMyContent(totalPages);
            paginationContainer.appendChild(lastBtn);
        }
        
        // 다음 버튼
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.innerHTML = '다음';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => loadHeaderMyContent(currentPage + 1);
        paginationContainer.appendChild(nextBtn);
        
        // 페이지 정보
        const pageInfo = document.createElement('span');
        pageInfo.className = 'pagination-info';
        pageInfo.textContent = `${currentPage} / ${totalPages}`;
        paginationContainer.appendChild(pageInfo);
    }
    
    // 콘텐츠 아이템 생성 함수
    function createHeaderContentItem(data) {
        const div = document.createElement('div');
        div.className = `content-item ${data.type}`;
        
        if (data.type === 'post') {
            div.innerHTML = `
                <div class="content-type">
                    <div class="content-type-icon">
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    게시글
                </div>
                ${data.board ? `<div class="content-board">${escapeHeaderHtml(data.board)}</div>` : ''}
                <div class="content-title">${escapeHeaderHtml(data.title)}</div>
                <div class="content-preview">${escapeHeaderHtml(data.content)}</div>
                <div class="content-meta">
                    <span>${data.date}</span>
                    <span>조회 ${data.views}</span>
                    <span>좋아요 ${data.likes}</span>
                    <span>댓글 ${data.comments}</span>
                </div>
            `;
        } else {
            div.innerHTML = `
                <div class="content-type">
                    <div class="content-type-icon">
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                    </div>
                    댓글
                </div>
                ${data.board ? `<div class="content-board">${escapeHeaderHtml(data.board)}</div>` : ''}
                <div class="content-title">${escapeHeaderHtml(data.title)}</div>
                <div class="content-preview">${escapeHeaderHtml(data.content)}</div>
                <div class="content-meta">
                    <span>${data.date}</span>
                </div>
            `;
        }
        
        // 클릭 이벤트 추가
        div.addEventListener('click', function() {
            if (data.url) {
                window.location.href = data.url;
            }
        });
        
        return div;
    }
    
    // 알림 로드 함수
    function loadHeaderNotifications() {
        const notificationList = document.getElementById('notificationList');
        const loading = document.getElementById('notificationLoading');
        const emptyState = document.getElementById('notificationEmptyState');
        
        // 요소 존재 확인
        if (!notificationList || !loading) {
            console.error('알림 요소를 찾을 수 없습니다');
            return;
        }
        
        // 로딩 표시
        loading.style.display = 'flex';
        if (emptyState) emptyState.style.display = 'none';
        
        // 기존 콘텐츠 제거하고 로딩 표시
        notificationList.innerHTML = '';
        notificationList.appendChild(loading);
        
        // API 호출
        fetch('/includes/header_modal_api.php?action=get_notifications')
            .then(response => response.json())
            .then(data => {
                // 로딩 제거
                loading.style.display = 'none';
                notificationList.innerHTML = '';
                
                if (data.error) {
                    notificationList.innerHTML = `<div class="text-center text-danger">${data.error}</div>`;
                    return;
                }
                
                if (!data.data || data.data.length === 0) {
                    if (emptyState) {
                        emptyState.style.display = 'flex';
                        notificationList.appendChild(emptyState);
                    } else {
                        notificationList.innerHTML = '<div class="empty-state"><p>새로운 알림이 없습니다.</p></div>';
                    }
                } else {
                    data.data.forEach(notification => {
                        const notificationItem = createHeaderNotificationItem(notification);
                        notificationList.appendChild(notificationItem);
                    });
                }
                
                // 알림 뱃지 업데이트
                if (data.unreadCount > 0) {
                    updateHeaderNotificationBadge(data.unreadCount);
                }
            })
            .catch(error => {
                console.error('Error loading notifications:', error);
                loading.style.display = 'none';
                notificationList.innerHTML = '<div class="text-center text-danger">알림을 불러오는 중 오류가 발생했습니다.</div>';
            });
    }
    
    // 알림 아이템 생성 함수
    function createHeaderNotificationItem(data) {
        const div = document.createElement('div');
        div.className = `notification-item ${data.unread ? 'unread' : ''}`;
        
        let iconSvg = '';
        if (data.type === 'comment') {
            iconSvg = '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>';
        } else if (data.type === 'reply') {
            iconSvg = '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>';
        } else {
            iconSvg = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>';
        }
        
        div.innerHTML = `
            <div class="notification-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${iconSvg}
                </svg>
            </div>
            <div class="notification-content">
                <div class="notification-message">${escapeHeaderHtml(data.message)}</div>
                ${data.preview ? `<div class="notification-preview">${escapeHeaderHtml(data.preview)}</div>` : ''}
                <div class="notification-time">${escapeHeaderHtml(data.time)}</div>
            </div>
        `;
        
        // 클릭 이벤트 추가
        div.addEventListener('click', function() {
            // 알림을 읽음 처리
            if (data.unread) {
                markHeaderAsRead(data.id);
                div.classList.remove('unread');
            }
            
            // 해당 페이지로 이동
            if (data.url) {
                window.location.href = data.url;
            }
        });
        
        return div;
    }
    
    // HTML 이스케이프 함수
    function escapeHeaderHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    // 알림 읽음 처리 함수
    function markHeaderAsRead(notificationId) {
        const formData = new FormData();
        formData.append('notification_id', notificationId);
        
        fetch('/includes/header_modal_api.php?action=mark_notification_read', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 알림 뱃지 업데이트
                updateHeaderNotificationBadge(-1);
            }
        })
        .catch(error => {
            console.error('Error marking notification as read:', error);
        });
    }
    
    // 알림 뱃지 업데이트 함수
    function updateHeaderNotificationBadge(count) {
        const notificationButton = document.getElementById('notificationButton');
        if (!notificationButton) return;
        
        let badge = notificationButton.querySelector('.notification-badge');
        
        if (count > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'notification-badge';
                notificationButton.appendChild(badge);
            }
            badge.textContent = count > 99 ? '99+' : count;
        } else if (badge) {
            badge.remove();
        }
    }
    
    // 페이지 로드 시 알림 개수 확인
    checkHeaderNotificationCount();
    
    function checkHeaderNotificationCount() {
        fetch('/includes/header_modal_api.php?action=get_notifications')
            .then(response => response.json())
            .then(data => {
                if (data.success && data.unreadCount > 0) {
                    updateHeaderNotificationBadge(data.unreadCount);
                }
            })
            .catch(error => {
                console.error('Error checking notifications:', error);
            });
    }
});


    document.addEventListener('DOMContentLoaded', function() {
        // 프로필 메뉴 토글
        const profileContainer = document.getElementById('profileContainer');
        const profileMenu = document.getElementById('profileMenu');
        
        if (profileContainer && profileMenu) {
            profileContainer.addEventListener('click', function(e) {
                e.stopPropagation();
                profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
            });
        }
        
        // 알림 버튼 클릭 이벤트
        const notificationButton = document.getElementById('notificationButton');
        if (notificationButton) {
            notificationButton.addEventListener('click', function(e) {
                e.stopPropagation();
                // 알림 모달 열기
                if (typeof window.openHeaderNotificationModal === 'function') {
                    window.openHeaderNotificationModal();
                }
            });
        }
        
        // 내가 쓴 글 버튼 클릭 이벤트
        const myPostsBtn = document.getElementById('myPostsBtn');
        if (myPostsBtn) {
            myPostsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                // 내가 쓴 글 모달 열기
                if (typeof window.openHeaderMyPostsModal === 'function') {
                    window.openHeaderMyPostsModal();
                }
                // 프로필 메뉴 닫기
                if (profileMenu) {
                    profileMenu.style.display = 'none';
                }
            });
        }
        
        // 다른 곳 클릭 시 프로필 메뉴 닫기
        document.addEventListener('click', function() {
            if (profileMenu && profileMenu.style.display === 'block') {
                profileMenu.style.display = 'none';
            }
        });
        
        // 모바일 메뉴 토글 - 개선된 방식
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 모바일 환경에서는 active 클래스만 토글
                sidebar.classList.toggle('active');
                
                // 오버레이 활성화
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.toggle('active');
                }
            });
        }
        
        // 사이드바 토글 버튼
        const toggleSidebar = document.getElementById('toggleSidebar');
        const toggleIcon = document.getElementById('sidebarToggleIcon');
        
        if (toggleSidebar && sidebar) {
            toggleSidebar.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
                
                // 토글 아이콘 업데이트
                const isCollapsed = sidebar.classList.contains('collapsed');
                if (toggleIcon) {
                    toggleIcon.classList.toggle('collapsed', isCollapsed);
                }
                
                document.getElementById('header').classList.toggle('sidebar-open');
                
                // 사이드바 상태 변경 함수 호출
                if (typeof window.updateLayoutForSidebar === 'function') {
                    window.updateLayoutForSidebar(isCollapsed);
                }
            });
        }
        
        // 사이드바 상태 변경 이벤트 리스너
        document.addEventListener('sidebarStateChange', function(e) {
            const isCollapsed = e.detail.isCollapsed;
            const header = document.getElementById('header');
            
            if (isCollapsed) {
                header.classList.remove('sidebar-open');
                if (toggleIcon) {
                    toggleIcon.classList.add('collapsed');
                }
            } else {
                header.classList.add('sidebar-open');
                if (toggleIcon) {
                    toggleIcon.classList.remove('collapsed');
                }
            }
        });
        
        // 페이지 로드 시 저장된 사이드바 상태 확인
        const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (sidebarCollapsed && sidebar) {
            sidebar.classList.add('collapsed');
            document.getElementById('header').classList.remove('sidebar-open');
            if (toggleIcon) {
                toggleIcon.classList.add('collapsed');
            }
        }
    });


document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const header = document.getElementById('header');
    
    // 메뉴 섹션 토글 기능
    const menuTitles = document.querySelectorAll('.tubelab-sidebar .menu-title.has-submenu');
    const memberId = '250';
    const sidebarStateKey = `sidebarState_${memberId}`;

    // 페이지 로드 시 저장된 상태 복원
    if (memberId) {
        const savedState = localStorage.getItem(sidebarStateKey);
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                
                // 먼저 모든 메뉴를 초기화 (PHP의 기본 상태 무시)
                document.querySelectorAll('.menu-title.has-submenu').forEach(menu => {
                    // data-menu-id가 없는 메뉴에 임시로 추가
                    if (!menu.getAttribute('data-menu-id')) {
                        const menuText = menu.textContent.trim().replace(/\s+/g, '_');
                        menu.setAttribute('data-menu-id', 'menu_' + menuText);
                    }
                    
                    menu.classList.remove('expanded');
                    let sibling = menu.nextElementSibling;
                    while (sibling && sibling.classList.contains('menu-item')) {
                        sibling.style.display = 'none';
                        sibling = sibling.nextElementSibling;
                    }
                });
                
                // 저장된 상태대로 복원
                Object.keys(state.menus || {}).forEach(menuId => {
                    const menuEl = document.querySelector(`[data-menu-id="${menuId}"]`);
                    if (menuEl && state.menus[menuId]) {
                        menuEl.classList.add('expanded');
                        let sibling = menuEl.nextElementSibling;
                        while (sibling && sibling.classList.contains('menu-item')) {
                            sibling.style.display = 'block';
                            sibling = sibling.nextElementSibling;
                        }
                    }
                });
            } catch (e) {
                console.error('메뉴 상태 복원 오류:', e);
            }
        }
    }

    menuTitles.forEach(function(title) {
        title.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            // 다음 형제 요소들 중 menu-item 클래스를 가진 요소들을 토글
            let sibling = this.nextElementSibling;
            while (sibling && sibling.classList.contains('menu-item')) {
                sibling.style.display = sibling.style.display === 'none' ? 'block' : 'none';
                sibling = sibling.nextElementSibling;
            }
            
            // 상태 저장 추가
            if (memberId) {
                const state = { menus: {} };
                document.querySelectorAll('.menu-title.has-submenu').forEach(menu => {
                    const menuId = menu.getAttribute('data-menu-id');
                    if (menuId) {
                        state.menus[menuId] = menu.classList.contains('expanded');
                    }
                });
                localStorage.setItem(sidebarStateKey, JSON.stringify(state));
            }
        });
    });
    
    // 전역 함수로 사이드바 상태 업데이트 함수 정의
    window.updateLayoutForSidebar = function(isCollapsed) {
        if (header) {
            if (isCollapsed) {
                header.classList.remove('sidebar-open');
            } else {
                header.classList.add('sidebar-open');
            }
        }
        
        if (isCollapsed) {
            document.body.classList.remove('has-sidebar');
            document.body.classList.add('sidebar-collapsed');
        } else {
            document.body.classList.add('has-sidebar');
            document.body.classList.remove('sidebar-collapsed');
        }
        
        localStorage.setItem('sidebarCollapsed', isCollapsed ? 'true' : 'false');
        
        const event = new CustomEvent('sidebarStateChange', { 
            detail: { isCollapsed: isCollapsed } 
        });
        document.dispatchEvent(event);
    };
    
    // 페이지 로드 시 저장된 사이드바 상태 확인
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebar) {
        if (sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            if (header) header.classList.remove('sidebar-open');
            document.body.classList.remove('has-sidebar');
            document.body.classList.add('sidebar-collapsed');
        } else {
            sidebar.classList.remove('collapsed');
            if (header) header.classList.add('sidebar-open');
            document.body.classList.add('has-sidebar');
            document.body.classList.remove('sidebar-collapsed');
        }
    }
    
    // 모바일 메뉴 닫기 버튼
    const closeSidebarBtn = document.getElementById('closeMobileSidebarBtn');
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        });
    }
    
    // 메뉴 클릭 시 쿠키 업데이트 (새 글 알림용)
    document.querySelectorAll('.menu-item, .menu-title').forEach(function(menuItem) {
        menuItem.addEventListener('click', function(e) {
            const featureCode = this.getAttribute('data-feature-code');
            const href = this.href || '';
            
            // 수익인증 관련 메뉴 클릭 시
            if (featureCode && (featureCode.toLowerCase().includes('profit') || 
                featureCode.toLowerCase().includes('income') ||
                href.includes('profit') || 
                href.includes('income'))) {
                
                const memberId = '250';
                if (memberId) {
                    // 클릭 시점이 아닌, 실제 페이지 방문 시 쿠키 업데이트를 위해
                    // 세션 스토리지에 플래그 저장
                    sessionStorage.setItem('visitProfitPage', 'true');
                }
            }
        });
    });
    
    // 새 글 확인 주기적 업데이트 (선택사항 - 5분마다)
        setInterval(function() {
        // AJAX로 새 글 확인하거나 페이지 리로드
        // location.reload();
    }, 300000); // 5분
        
    // 검토 대기 미션 수 주기적 업데이트 (5분마다)
    });


    document.addEventListener('DOMContentLoaded', function() {
        // 사이드바가 있는지 확인하고 body에 클래스 추가
        if (document.getElementById('sidebar')) {
            const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (sidebarCollapsed) {
                document.body.classList.add('sidebar-collapsed');
            } else {
                document.body.classList.add('has-sidebar');
            }
        }
        
        // 사이드바 상태 변경 이벤트 리스너
        document.addEventListener('sidebarStateChange', function(e) {
            const isCollapsed = e.detail.isCollapsed;
            
            if (isCollapsed) {
                document.body.classList.remove('has-sidebar');
                document.body.classList.add('sidebar-collapsed');
            } else {
                document.body.classList.add('has-sidebar');
                document.body.classList.remove('sidebar-collapsed');
            }
        });
    });


        // 전역 범위에 claimMedal 함수 정의
        function claimMedal(channelId, medalType) {
            // 메달 타입에 따른 이름 설정
            let medalName = '';
            switch(medalType) {
                case 'bronze': medalName = '동메달'; break;
                case 'silver': medalName = '은메달'; break;
                case 'gold': medalName = '금메달'; break;
                case 'completion': medalName = '트로피'; break;
            }
            
            // 확인 창
            if (!confirm(`${medalName}을(를) 수령하시겠습니까?`)) {
                return;
            }
            
            // AJAX 요청으로 메달 수령 처리
            fetch('data/medal_claim.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `channel_id=${encodeURIComponent(channelId)}&medal_type=${encodeURIComponent(medalType)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message || `${medalName}을(를) 성공적으로 수령했습니다!`);
                    location.reload(); // 페이지 새로고침
                } else {
                    alert(data.message || '메달 수령 중 오류가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('메달 수령 오류:', error);
                alert('메달 수령 중 오류가 발생했습니다.');
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            // 모달 요소
            const modal = document.getElementById('completed-channels-modal');
            const btn = document.getElementById('completed-channels-btn');
            const closeBtn = document.querySelector('.close-modal');
            
            // 버튼 클릭 시 모달 열기
            if (btn) {
                btn.addEventListener('click', function() {
                    modal.style.display = 'block';
                });
            }
            
            // 닫기 버튼 클릭 시 모달 닫기
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
            }
            
            // 모달 외부 클릭 시 모달 닫기
            window.addEventListener('click', function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            });
            
            // 메달 버튼 클릭 이벤트
            const medalButtons = document.querySelectorAll('.medal-button');
            
            medalButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    const medalType = this.getAttribute('data-medal');
                    const detailsElement = document.getElementById(medalType + '-details');
                    
                    // 모든 상세 정보 숨기기
                    document.querySelectorAll('.medal-details').forEach(function(details) {
                        details.style.display = 'none';
                    });
                    
                    // 선택한 메달의 상세 정보 표시
                    detailsElement.style.display = 'block';
                });
            });
            
            // 닫기 버튼 이벤트
            const closeButtons = document.querySelectorAll('.close-details');
            
            closeButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    const detailsElement = this.closest('.medal-details');
                    detailsElement.style.display = 'none';
                });
            });
        });
    
