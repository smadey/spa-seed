import { getUser, setUser } from '../stores/user.store';
import { getUserById } from '../services/user.service';

function refreshUser() {
  const user = getUser();

  return getUserById(user.id, user.token).then((result) => {
    setUser(result);
    return getUser();
  });
}

export default {
  data() {
    return {
      logged: false,
    };
  },

  created() {
    if (getUser()) {
        this.logged = true;

        // refreshUser().then(() => {
        //   this.logged = true;
        // });
      }
    }
  },

  watch: {
    logged(val) {
      if (val) {
        this.afterAuth();
      }
    },
  },

  methods: {
    afterAuth() {
      console.log('用户认证成功！'); /* eslint no-console: 0 */
    },
  },

};
