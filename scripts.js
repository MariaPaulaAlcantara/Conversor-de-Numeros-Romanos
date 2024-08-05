$(document).ready(function () {
    var lookup = {
        'M': 1000,
        'CM': 900,
        'D': 500,
        'CD': 400,
        'C': 100,
        'XC': 90,
        'L': 50,
        'XL': 40,
        'X': 10,
        'IX': 9,
        'V': 5,
        'IV': 4,
        'I': 1
    };

    function converterNumRomano(num) {
        var roman = '';
        for (var i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }

    function converterNumDecimal(roman) {
        var num = 0;
        var i = 0;
        while (i < roman.length) {
            var char1 = roman[i];
            var char2 = roman[i + 1];
            var twoChar = char1 + char2;
            var value1 = lookup[char1] || 0;
            var value2 = lookup[twoChar] || 0;
            if (value2 > value1) {
                num += value2;
                i += 2;
            } else {
                num += value1;
                i++;
            }
        }
        return num;
    }

    function corrigirNumeroRomano(roman) {
        var romanos = Object.keys(lookup).reverse();
        var num = 0;
        var i = 0;
        while (i < roman.length) {
            var char1 = roman[i];
            var char2 = roman[i + 1];
            var twoChar = char1 + char2;
            var value1 = lookup[char1] || 0;
            var value2 = lookup[twoChar] || 0;
            if (value2 > value1) {
                num += value2;
                i += 2;
            } else {
                num += value1;
                i++;
            }
        }
        var romanCorreto = '';
        for (var i in lookup) {
            while (num >= lookup[i]) {
                romanCorreto += i;
                num -= lookup[i];
            }
        }
        return romanCorreto;
    }

    $("#converter_decimal").click(function () {
        var num = parseInt($("#input_num_decimal").val(), 10);
        console.log(num, 'teste!');
        if (!isNaN(num) && num >= 1 && num <= 399999) {
            $("#roman").val(converterNumRomano(num));
        } else if (isNaN(num)) {
            Swal.fire({
                icon: 'info',
                title: 'Valor não pode ser vazio',
                text: 'Coloque um valor em um dos campos',
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Valor não suportado',
                text: 'O valor deve estar entre 1 e 399999.',
            });
        }
    });

    $("#converter_romano").click(function () {
        var roman = $("#roman").val().toUpperCase();
        var convertedNum = converterNumDecimal(roman);
        if (convertedNum > 0 && convertedNum <= 399999) {
            $("#input_num_decimal").val(convertedNum);
        } else {
            var romanCorreto = corrigirNumeroRomano(roman);
            if (romanCorreto) {
                $("#roman").val(romanCorreto);
                $("#input_num_decimal").val(converterNumDecimal(romanCorreto));
            } else {
                $("#input_num_decimal").val('');
                $("#roman").val('');
            }
        }
    });

    $("#input_num_decimal").keypress(function (e) {
        if (e.which === 13) {
            $("#converter_decimal").click();
        }
    });

    $("#roman").keypress(function (e) {
        if (e.which === 13) {
            $("#converter_romano").click();
        }
    });
});
