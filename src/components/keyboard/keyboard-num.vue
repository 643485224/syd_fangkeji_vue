<template>
    <div id="keyboard-num">
        <div class="key-row">
            <el-button class="row-btn" @click="onNumDown('1')">1</el-button>
            <el-button class="row-btn" @click="onNumDown('2')">2</el-button>
            <el-button class="row-btn" @click="onNumDown('3')">3</el-button>
        </div>

        <div class="key-row">
            <el-button class="row-btn" @click="onNumDown('4')">4</el-button>
            <el-button class="row-btn" @click="onNumDown('5')">5</el-button>
            <el-button class="row-btn" @click="onNumDown('6')">6</el-button>
        </div>

        <div class="key-row">
            <el-button class="row-btn" @click="onNumDown('7')">7</el-button>
            <el-button class="row-btn" @click="onNumDown('8')">8</el-button>
            <el-button class="row-btn" @click="onNumDown('9')">9</el-button>
        </div>

        <div class="key-row">
            <el-button class="row-btn" icon-only @click="onClean()" style="font-size: 2.8rem;">
                <!-- <i class="el-icon-circle-close"></i> -->
                <img src="../../assets/imgs/clear.svg" alt="">
            </el-button>
            <el-button class="row-btn" @click="onNumDown('0')">0</el-button>
            <el-button class="row-btn" icon-only @click="onBackspace()">
                <!-- <i class="el-icon-close"></i> -->
                <img src="../../assets/imgs/delete.svg" alt="">
            </el-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        inviteCode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            code:''
        };
    },
    created() {
        this.code = this.inviteCode;
    },
    methods: {
        onNumDown(char) {
            if (this.code.length < 6) {
                this.code += char;
                this.$emit("codeChange",this.code)
            }
        },
        onBackspace() {
            if (this.code.length) {
                this.code = this.code.substring(0, this.code.length - 1);
                this.$emit("codeChange",this.code)

            }
        },

        onClean() {
            this.code = "";
                this.$emit("codeChange",this.code)

        }
    },
};
</script>

<style lang="scss" scoped>
.key-row {
    width: 100%;
    display: flex;
    align-items: center;

    .row-btn {
        flex: auto;
        height: 5rem;
        width: 8rem;
        font-size: 3.4rem;
        padding: 0 2.8rem;
        margin: 6px;
        background: #0b94e7;
        box-shadow: inset 0px -2px 3px rgb(0 0 0 / 20%), 0px 1px 0px rgb(255 255 255);
        border: 1px solid #0b94e7;
        color: #fff;
    }

    .el-button {
        border-radius: 0;
    }
}
</style>
