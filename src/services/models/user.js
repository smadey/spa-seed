import Base from '../../../lib-core/js/services/models/base';

class User extends Base {
  constructor(options) {
    super(options);

    this.name = options.name;
  }
}

export default User;
