var User = /** @class */ (function () {
    function User() {
        console.log('cons');
        User.init();
    }
    User.init = function () {
        var poolData = {
            UserPoolId: 'us-east-2_dTU91kr86',
            ClientId: '49bj80on4vp53kbkug4de91v7'
        };
        var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
        User.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        User.isAuthenticated(); // to set the menu
    };
    User._getCUser = function () {
        if (User.userPool == null)
            throw Error('null, not init()');
        var userData = {
            Username: User.emailGet(),
            Pool: User.userPool
        };
        var cognitoUser = User.userPool.getCurrentUser();
        cognitoUser.getSession(function (err, session) {
            if (err)
                throw err;
        });
        return cognitoUser;
    };
    User.getNewPoolUser = function (email) {
        if (User.userPool == null)
            throw Error('null, not init()');
        var userData = {
            Username: email,
            Pool: User.userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        return cognitoUser;
    };
    User.getUserAttributes = function () {
        return new Promise(function (resolve, reject) {
            User._getCUser().getUserAttributes(function (err, result) {
                if (err) {
                    console.log('attr er');
                    console.log(err);
                    reject(err);
                    return;
                }
                //console.log( res2)
                var bean = new Object();
                for (var i = 0; i < result.length; i++) {
                    //console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue())
                    bean[result[i].getName()] = result[i].getValue();
                }
                console.log(bean);
                window['SITE'].dispatch(true);
                resolve(bean);
            }); //attr()
        }); //pro
    }; //()
    User.isAuthenticated = function () {
        return new Promise(function (resolve, reject) {
            User.getUserAttributes().then(function (val) {
                console.log(val);
                window['SITE'].dispatch(true);
                resolve(true);
            })["catch"](function (err) {
                window['SITE'].dispatch(false);
                resolve(false); // it's ok, resolve. but false
            });
        }); //pro
    }; //()
    User.authenticate = function (email, pswd) {
        var authenticationData = {
            Username: email,
            Password: pswd
        };
        return new Promise(function (resolve, reject) {
            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
            var cognitoUser = User.getNewPoolUser(email);
            cognitoUser.authenticateUser(authenticationDetails, {
                //ret
                onSuccess: function (result) {
                    //console.log('access token + ' + result.getAccessToken().getJwtToken())
                    //console.log(result)
                    User.afterAuth();
                    window['SITE'].dispatch(true);
                    resolve(result);
                },
                //err
                onFailure: function (err) {
                    console.log('err');
                    console.log(err);
                    window['SITE'].dispatch(false);
                    reject(err);
                }
            }); //auth
        }); //pro
    }; //()
    User.afterAuth = function () {
        User.getUserAttributes().then(function (bean) {
            console.log(bean);
            User.nameSet(bean['name']);
        })["catch"](function (err) {
            console.log('Bean Auth Error:');
            console.log(err);
        });
    }; //()
    User.signUp = function (fullName, email, pswd) {
        if (User.userPool == null)
            throw Error('null, not init()');
        var dataEmail = {
            Name: 'email',
            Value: email
        };
        var dataName = {
            Name: 'name',
            Value: fullName
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
        var attributeList = [];
        attributeList.push(attributeEmail);
        attributeList.push(attributeName);
        return new Promise(function (resolve, reject) {
            User.userPool.signUp(email, pswd, attributeList, null, function (err, result) {
                if (err) {
                    //console.log('err')
                    //console.log(err)
                    reject(err);
                    return;
                }
                console.log(result);
                console.log(result.user);
                resolve();
            }); //signUp
        });
    }; //()
    User.confirmCode = function (email, code) {
        return new Promise(function (resolve, reject) {
            User.getNewPoolUser(email).confirmRegistration(code, true, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                console.log('call result: ' + result);
                resolve();
            }); //confirm
        }); //pro
    }; //
    User._resendCode = function (email) {
        User.getNewPoolUser(email).resendConfirmationCode(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
        }); //resend
    }; //()
    User.requestPswdReset = function (email) {
        User.getNewPoolUser(email).forgotPassword({
            onSuccess: function (data) {
                console.log(data);
            },
            onFailure: function (err) {
                console.log(err);
            }
        });
    }; //()
    User.enterNewPswdWCode = function (email, newPswd, code) {
        return new Promise(function (resolve, reject) {
            User.getNewPoolUser(email).confirmPassword(code, newPswd, {
                onSuccess: function () {
                    console.log('Password confirmed!');
                    User.logout();
                    resolve();
                    return;
                },
                onFailure: function (err) {
                    console.log(err);
                    try {
                        if (err.code == 200 || err.statusCode == 200) {
                            resolve();
                            return;
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                    console.log('Password not confirmed!');
                    reject(err);
                }
            }); //confirm
        });
    }; //()
    User._deleteAccount = function () {
        User.getNewPoolUser(User.emailGet()).deleteUser();
        User.logout();
        localStorage.clear();
    };
    User.logout = function () {
        User.getNewPoolUser(User.emailGet()).signOut();
        sessionStorage.clear();
        window['SITE'].dispatch(false);
        console.log('logout');
    };
    User.emailSet = function (email) {
        localStorage.setItem('Nemail', email);
    };
    User.emailClear = function () {
        localStorage.removeItem('Nemail');
        sessionStorage.clear();
    };
    User.emailGet = function () {
        return localStorage['Nemail'];
    };
    User.nameGet = function () {
        return sessionStorage['Nname'];
    };
    User.nameSet = function (name) {
        sessionStorage.setItem('Nname', name);
    };
    User.memLevelGet = function () {
        return sessionStorage['Nlevel'];
    };
    User.memLevelSet = function (level) {
        sessionStorage.setItem('Nlevel', level);
    };
    return User;
}()); //class
User.init(); // cons so I don't have to singleton 
