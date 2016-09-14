function Factory() {

    // main method of the factory that will create certain objects
    this.create = function(type, x, y, name) {
        switch (type) {
            case "player":
                // TODO: create a player and return it
                return new Player(name, x, y);
            case "enemy":
                // TODO: create an enemy and return it
                return new Enemy(name, x, y);
            case "orb":
                // TODO: create an orb and return it
                return new Orb(x, y);
        }

        return undefined;
    }
}