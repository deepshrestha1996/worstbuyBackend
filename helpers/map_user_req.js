var passwordHash = require("password-hash")
function map_user_req(user, userDetails) {
    if(userDetails.role)
        user.role= userDetails.role;
    if (userDetails.firstName)
        user.firstName = userDetails.firstName;
    if (userDetails.lastName)
        user.lastName = userDetails.lastName;
    if (userDetails.username)
        user.username = userDetails.username;
    if (userDetails.password)
        user.password = passwordHash.generate(userDetails.password);
    if (userDetails.emailAddress)
        user.emailAddress = userDetails.emailAddress;
    if (userDetails.city)
        user.city = userDetails.city;
    if (userDetails.street)
        user.street = userDetails.street;
    if (userDetails.zip)
        user.zip = userDetails.zip;
    if (userDetails.dob)
        user.dob = new Date(userDetails.dob);
    if (userDetails.phoneNumber)
        user.phoneNumber = userDetails.phoneNumber;
    return user;
}

module.exports = map_user_req;