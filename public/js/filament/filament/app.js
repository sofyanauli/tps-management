// Wrap the entire Alpine initialization in a try-catch block
document.addEventListener('alpine:init', () => {
    try {
        window.Alpine.plugin(F);
        window.Alpine.store('sidebar', {
            isOpen: window.Alpine.$persist(true).as('isOpen'),
            collapsedGroups: window.Alpine.$persist([]).as('collapsedGroups'),
            groupIsCollapsed: function(n) {
                return this.collapsedGroups?.includes(n) || false;
            },
            collapseGroup: function(n) {
                if (!this.collapsedGroups?.includes(n)) {
                    this.collapsedGroups = (this.collapsedGroups || []).concat(n);
                }
            },
            toggleCollapsedGroup: function(n) {
                this.collapsedGroups = this.collapsedGroups?.includes(n) 
                    ? (this.collapsedGroups || []).filter(p => p !== n)
                    : (this.collapsedGroups || []).concat(n);
            },
            close: function() {
                this.isOpen = false;
            },
            open: function() {
                this.isOpen = true;
            }
        });

        let s = localStorage.getItem('theme') ?? getComputedStyle(document.documentElement).getPropertyValue('--default-theme-mode');
        
        window.Alpine.store('theme', 
            s === 'dark' || (s === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
                ? 'dark'
                : 'light'
        );

        window.addEventListener('theme-changed', n => {
            let p = n.detail;
            localStorage.setItem('theme', p);
            p = p === 'system' 
                ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                : p;
            window.Alpine.store('theme', p);
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', n => {
            if (localStorage.getItem('theme') === 'system') {
                window.Alpine.store('theme', n.matches ? 'dark' : 'light');
            }
        });

        window.Alpine.effect(() => {
            window.Alpine.store('theme') === 'dark'
                ? document.documentElement.classList.add('dark')
                : document.documentElement.classList.remove('dark');
        });
    } catch (error) {
        console.warn('Alpine.js store initialization warning:', error);
    }
});