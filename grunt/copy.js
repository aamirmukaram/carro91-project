module.exports = {
    layout1: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts', dest: "layout1/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts', dest: "layout1/assets/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/themify-icons/fonts', dest: "layout1/assets/css/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/slick-carousel/slick/fonts', dest: "layout1/assets/css/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/flag-icon-css/flags', dest: "layout1/assets/flags"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/templates',     dest: "layout1/templates"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/api',     dest: "layout1/assets/api"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/i18n',    dest: "layout1/assets/i18n"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/images',     dest: "layout1/assets/images"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/js/config',      dest: "layout1/assets/js/config"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/js/directives',      dest: "layout1/assets/js/directives"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/js/controllers',      dest: "layout1/assets/js/controllers"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/js/filters',      dest: "layout1/assets/js/filters"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/views',     dest: "layout1/assets/views"},
            {expand: true, src: "**", cwd: 'LAYOUT-1/STANDARD/assets/css/themes',     dest: "layout1/assets/css/themes"},
            {src: 'bower_components/slick-carousel/slick/ajax-loader.gif', dest : 'layout1/assets/css/ajax-loader.gif'},
            {src: 'LAYOUT-1/STANDARD/master/_index.min.html', dest : 'layout1/index.html'},
            {src: 'LAYOUT-1/STANDARD/favicon.ico', dest : 'layout1/favicon.ico'},
            {src: 'LAYOUT-1/STANDARD/upload.php', dest : 'layout1/upload.php'}
        ]
    }
};
