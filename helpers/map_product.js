function map_product(product, productDetails) {
    if (productDetails.productId)
        product.productId = productDetails.productId;
    if (productDetails.productName)
        product.productName = productDetails.productName;
    if (productDetails.quantity)
        product.quantity = productDetails.quantity;
    if (productDetails.price)
        product.price = productDetails.price;
    if (productDetails.brand)
        product.brand = productDetails.brand;
    if (productDetails.user)
        product.user = productDetails.loggedInUser._id;
    if (productDetails.status)
        product.status = productDetails.status;
    if (productDetails.supplierName || productDetails.supplierAddress) {
        product.supplier = {}
        if (productDetails.supplierName)
            product.supplierName = productDetails.supplierName
        if (productDetails.supplierAddress)
            product.supplierAddress = productDetails.supplierAddress
        if (productDetails.contactDetails || productDetails.email || productDetails.phoneNumber) {
            product.contactDetails = {}
            if (productDetails.email)
                product.contactDetails.email = productDetails.email
            if (productDetails.phoneNumber)
                product.contactDetails.phoneNumber = productDetails.phoneNumber

            if (productDetails.tags)
                product.tags = productDetails.tags.split(",");
            if (productDetails.quality)
                product.quality = productDetails.quality;
        }
    }
    return product
}

module.exports = map_product;