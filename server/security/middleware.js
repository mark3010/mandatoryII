export function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        return res.status(401).json({ message: "Access denied" });
    }
} 

export function isAuthorized(req, res, next) {
    //some calls only allowed by the user itself and administrators
    if (req.session.admin) {
        next();
    } else if (req.session.uuid === req.params.UUID) {
        next();
    } else if (req.session.uuid === req.body.UUID) {
        next();
    } else {
        return res.status(401).json({ message: "Access denied" });
    }
}

export function isAdmin(req, res, next) {
    //some calls only allowed by the  administrators
    if (req.session.admin) {
        next();
    }  else {
        return res.status(401).json({ message: "Access denied" });
    }
}
