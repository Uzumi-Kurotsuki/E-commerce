(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });
    
    function toggleContent() {
        var content = document.querySelector('.content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    }
    
    $(document).ready(function () {
        $(".btn-delete").click(function () {
            var id = $(this).data("id");

            // Kirim permintaan AJAX ke file penghapusan
            $.ajax({
                type: "POST",
                url: "hapus_barang.php", // Ganti dengan nama file yang sesuai
                data: { id: id },
                success: function (response) {
                    if (response === "success") {
                        // Hapus baris tabel secara lokal
                        $("#row-" + id).remove();
                    } else {
                        alert("Gagal menghapus data. Coba lagi.");
                    }
                }
            });
        });
    });


    document.addEventListener('DOMContentLoaded', function () {
        // Add event listener to quantity input
        document.querySelectorAll('.quantity-input').forEach(function (input) {
            input.addEventListener('input', function () {
                updateTotalPrice(this);
            });
        });
    
        // Add event listener to plus and minus buttons
        document.querySelectorAll('.btn-plus, .btn-minus').forEach(function (button) {
            button.addEventListener('click', function () {
                const input = this.closest('.input-group').querySelector('.quantity-input');
                updateTotalPrice(input);
            });
        });
    
        function updateTotalPrice(input) {
            const rowId = input.getAttribute('data-id');
            const hargaElement = document.getElementById('row-' + rowId).querySelector('.harga');
            const totalHargaElement = document.getElementById('row-' + rowId).querySelector('.total-harga');
    
            // Attempt to parse harga and quantity as numbers
            const harga = parseFloat(hargaElement.innerText);
            const quantity = parseInt(input.value);
    
            // Check if parsing was successful
            if (isNaN(harga) || isNaN(quantity)) {
                console.error('Invalid harga or quantity:', hargaElement.innerText, input.value);
                return;
            }
    
            const totalHarga = harga * quantity;
    
            // Check if the result is a valid number
            if (isNaN(totalHarga)) {
                console.error('Invalid totalHarga:', totalHarga);
                return;
            }
    
            totalHargaElement.innerText = totalHarga.toFixed(2);
        }
    });
    

})(jQuery);

