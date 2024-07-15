$(document).ready(function () {
    $('#burger').click(function () {
        $('#menu').addClass('open')
    });

    $('#menu').on('click', '*', function () {
        $('#menu').removeClass('open')
    });

    $('.intro-btn').click((e) => {
        $('.assortment')[0].scrollIntoView({behavior: "smooth"});
    });


    let productInput = $('#product')

    $('.product-button').click((e) => {
        productInput.val($(e.target).parents('.product-item').find('.name').text());
        $('.order-form')[0].scrollIntoView({behavior: "smooth"});
    })


    $('#thank-you-message').hide();
    let form = $('#order-form')
    let loader = $('.loader')
    $('#submit').click(function () {
        let product = $('#product');
        let name = $('#name');
        let phone = $('#phone');
        let hasError = false;
        $('.error-input').hide();

        if (!product.val()) {
            product.next().show();
            product.css('border', '2px solid red');
            hasError = true;
        } else {
            product.css('border', '1px solid #821328FF')
        }
        if (!name.val()) {
            name.next().show();
            name.css('border', '2px solid red');
            hasError = true;
        } else {
            name.css('border', '1px solid #821328FF')
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('border', '2px solid red');
            hasError = true;
        } else {
            phone.css('border', '1px solid #821328FF')
        }
        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        form.hide()
                        console.log(msg)
                        alert('Заказ создан')
                        $('#thank-you-message').show();
                    } else {
                        console.log(msg)
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                        form.trigger('reset');
                    }
                });
        }
    });

});



