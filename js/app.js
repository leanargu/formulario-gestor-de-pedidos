var initFunction = (function () {

    function agregar() {
        $("#navent-btn-crear").unbind("click");
        $("#navent-btn-crear").click(function (event) {
            event.preventDefault();

            var nombre = $("#navent-campo-nombre").val();
            var monto = $("#navent-campo-monto").val();
            var montoNumber = (monto === undefined || monto == "") ? -1 : Number(monto)
            var descuento = $("#navent-campo-descuento").val();
            var descuentoNumber = (descuento === undefined || descuento == "") ? -1 : Number(descuento)


            if (sonCamposValidos(nombre, montoNumber, descuentoNumber)) {
                var pedidoJson = crearJsonDePedido(nombre, monto, descuento);
                $.ajax({
                    type: "POST",
                    url: "/pedidos/guardar",
                    contentType: "application/json",
                    data: pedidoJson,
                    success: function (id) {
                        resetearCampos();
                    },
                    error: function (e) {
                        console.log(e.responseJSON.message);
                    }
                });
            }
        });
    }

    function sonCamposValidos(nombre, montoNumber, descuentoNumber) {
        return esNombreValido(nombre) && esMontoValido(montoNumber) && esDescuentoValido(descuentoNumber)
    }

    function esNombreValido(nombre) {
        if (nombre.length > 0 && nombre.length <= 100) {
            return true;
        } else if (nombre.length == 0) {
            window.alert("Error: El campo nombre es obligatorio.");
            return false;
        } else {
            window.alert("Error: El campo nombre supera los 100 caracteres.");
            return false;
        }
    }

    function esMontoValido(monto) {
        if (typeof monto === "number" && monto >= 0) {
            return true;
        } else if (monto == -1) {
            window.alert("Error: El campo monto es obligatorio.");
        } else {
            window.alert("Error: El campo monto sólo acepta números.");
            return;
        }
    }

    function esDescuentoValido(descuento) {
        if (typeof descuento === "number" && descuento >= 0) {
            return true;
        } else if (descuento == -1) {
            window.alert("Error: El campo descuento es obligatorio.");
        }else {
            window.alert("Error: El campo descuento sólo acepta números.");
            return;
        }
    }

    function crearJsonDePedido(nombre, monto, descuento) {
        return JSON.stringify({
            "nombre": nombre,
            "monto": monto,
            "descuento": descuento
        });
    }

    function resetearCampos() {
        $("#navent-campo-nombre").val("");
        $("#navent-campo-monto").val("");
        $("#navent-campo-descuento").val("");
    }

    function inicializar() {
        agregar();
    }

    return {
        init: inicializar
    };

})();

$(document).ready(initFunction.init());
