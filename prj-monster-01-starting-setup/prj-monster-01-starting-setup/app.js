function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            counter: 0,
            winner: null,
            battleLog: []
        };
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value < 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth <= 0) {
                return { width: '0%' };
            } else {

                return { width: this.monsterHealth + '%' };
            }
        },
        playerBarStyles() {
            if (this.playerHealth <= 0) {
                return { width: '0%' };
            } else {

                return { width: this.playerHealth + '%' };
            }
        },
        provideSpecialAttack() {
            return this.counter % 3 !== 0;
        },
        // check() {
        //     return this.playerHealth <= 0 && this.monsterHealth <= 0;
        // }
    },
    methods: {
        attackMonster() {
            this.counter++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLog('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 12);
            this.playerHealth -= attackValue;
            this.addLog('monster', 'attack', attackValue);
        },
        specialAttack() {
            this.counter++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLog('player', 'attack', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.counter++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {

                this.playerHealth += healValue;
            }
            this.addLog('player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        newGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.counter = 0;
            this.battleLog = [];
        },
        addLog(who, what, value) {
            this.battleLog.unshift({ actioner: who, actionType: what, actionValue: value });
        }

    }
});

app.mount('#game');