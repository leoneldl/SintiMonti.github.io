// Variables globales
var invoices = [];

// Función para agregar un nuevo producto a la lista
function addNewProduct() {
    var newProductInput = document.getElementById("new-product");
    var newProductPriceInput = document.getElementById("new-product-price");

    var newProduct = newProductInput.value;
    var newProductPrice = newProductPriceInput.value;

    // Verificar que se ingresen valores válidos
    if (newProduct !== "" && newProductPrice !== "") {
        var option = document.createElement("option");
        option.value = newProduct;
        option.text = newProduct + " - precio " + newProductPrice;
        var productSelect = document.getElementById("product");
        productSelect.appendChild(option);

        // Limpiar los campos de entrada
        newProductInput.value = "";
        newProductPriceInput.value = "";
    }
}

// Función para agregar una factura a la lista
function addInvoice() {
    var clientInput = document.getElementById("client");
    var productSelect = document.getElementById("product");
    var dateInput = document.getElementById("date");
    var priceInput = document.getElementById("price");
    var quantityInput = document.getElementById("quantity");
    var tableBody = document.getElementById("invoice-table-body");

    var client = clientInput.value;
    var product = productSelect.value;
    var date = dateInput.value;
    var price = priceInput.value;
    var quantity = quantityInput.value;
    var total = price * quantity;

    // Verificar que se ingresen valores válidos
    if (client !== "" && product !== "" && date !== "" && price !== "" && quantity !== "") {
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + client + "</td>" +
                        "<td>" + product + "</td>" +
                        "<td>" + date + "</td>" +
                        "<td>" + price + "</td>" +
                        "<td>" + quantity + "</td>" +
                        "<td>" + total + "</td>";
        tableBody.appendChild(row);

        // Agregar la factura al arreglo
        invoices.push({
            client: client,
            product: product,
            date: date,
            price: price,
            quantity: quantity,
            total: total
        });

        // Calcular el total sin impuestos
        var totalAmount = invoices.reduce(function (acc, invoice) {
            return acc + invoice.total;
        }, 0);
        var totalAmountElement = document.getElementById("total-amount");
        totalAmountElement.textContent = totalAmount;

        // Limpiar los campos de entrada
        clientInput.value = "";
        productSelect.value = "";
        dateInput.value = "";
        priceInput.value = "";
        quantityInput.value = "";
    }
}

// Función para compartir la lista de facturas por WhatsApp
function shareToWhatsApp() {
    var message = "🌸 Factura de Sinti Monti 🌸\n\n";
    invoices.forEach(function (invoice) {
        message += "👥 Cliente: " + invoice.client + "\n";
        message += "📦 Producto: " + invoice.product + "\n";
        message += "📅 Fecha: " + invoice.date + "\n";
        message += "💲 Precio: " + invoice.price + "\n";
        message += "✕ Cantidad: " + invoice.quantity + "\n";
        message += "Total: " + invoice.total + "\n\n";
    });

    message += "\nGracias por tu compra. Si necesitas algún otro producto, no dudes en contactarnos.";
    var encodedMessage = encodeURIComponent(message);
    var whatsappURL = "https://wa.me/?text=" + encodedMessage;
    window.open(whatsappURL);

    
}
