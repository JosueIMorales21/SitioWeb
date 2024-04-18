function openMenu(menuId) {
    var menu = document.getElementById(menuId);
    if (menu.style.display === "none" || menu.style.display === "") {
        // Hide all menus
        var menus = document.querySelectorAll('.menu');
        menus.forEach(function(menu) {
            menu.style.display = "none";
        });

        // Show the selected menu
        menu.style.display = "block";
    } else {
        // Hide the selected menu
        menu.style.display = "none";
    }
}
