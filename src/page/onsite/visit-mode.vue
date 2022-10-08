<template>
    <div class="onsite">
        <div class="onsite-main">
            <ul>
                <Debounce :time="1000" v-if="disposesForm.miscellaneous.miscellaneous_appointment">
                    <li @click="onQuery">
                        <img :src="photoOne" alt="" />
                        <p class="record-top">预约来访</p>
                        <p class="record-bottom">Appointment visit</p>
                    </li>
                </Debounce>
                <Debounce :time="1000">
                    <li @click="onCheckin">
                        <img :src="photoThree" alt="" />
                        <p class="registration-top">访客登记</p>
                        <p class="registration-bottom">Visitor registration</p>
                    </li>
                </Debounce>
            </ul>
        </div>
        <div class="onsite-foot">
            <div class="tips">
                <img src="../../assets/imgs/bottom.png" alt="" />
                <p class="onsite-p1">温馨提示</p>
                <p class="onsite-p2">1.如果您已进行预约，请点击<span style="color:red;">预约来访</span>。</p>
                <p class="onsite-p3">2.如果您需要访问人员，请点击<span style="color:red;">访客登记</span>。</p>
            </div>
            <div class="back-btn" @click="goBack">
                <img src="../../assets/imgs/Rectangle 33.png" alt="" />
                <p>返回</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import webData from "../../utils/shuJu";
import photoOne from "../../assets/imgs/FKJL1.png";
import photoTwo from "../../assets/imgs/FKDJ1.png";
import photoThree from "../../assets/imgs/FKQL.png";
export default {
    data() {
        return {
            photoOne,
            photoTwo,
            photoThree
        };
    },
    created() {
        webData.onsiteData = JSON.parse(JSON.stringify(webData.reduction)); //回到证件登记清空值
        console.log(webData.onsiteData, "清空后的");
    },
    methods: {
        onQuery() {
            this.$router.push({ name: "appointment" });
        },
        onCheckin() {
            this.$router.push({ name: "onsiteOne" });
        },
        goBack() {
            this.$router.push({ name: "onsiteHome" });
        },
    },
    components: {},
    computed: {
        ...mapState(["disposesForm", "heartBoolen"]),
    },
};
</script>

<style lang="scss" scoped>
@mixin onsite {
    .onsite {
        width: 100%;
        height: 100%;
        font-style: normal;
        font-family: Source Han Sans CN;
        font-weight: bold;

        .onsite-head {
            position: absolute;
            top: 9%;
            width: 100%;
            line-height: 50px;
            font-size: 36px;
            background: #ffeeda;
            color: #ff5301;
            padding: 0px 5px;
            box-sizing: border-box;
        }

        .onsite-main {
            width: 100%;
            height: 60%;

            ul {
                position: absolute;
                left: 50%;
                top: 40%;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);
                display: flex;
                justify-content: space-between;

                li {
                    position: relative;
                    margin: 0 2em;

                    p {
                        position: absolute;
                        width: 100%;
                        font-style: normal;

                        font-weight: bold;
                        color: #ffffff;
                    }
                }

                .record-top {
                    left: 10%;
                    top: 50%;
                    font-size: 36px;
                    transform: rotate(6deg);
                }

                .record-bottom {
                    left: 8%;
                    top: 65%;
                    font-size: 22.6888px;
                    transform: rotate(6deg);
                }

                .registration-top {
                    left: 0%;
                    top: 50%;
                    font-size: 40px;
                    text-align: center;
                }

                .registration-bottom {
                    left: 0%;
                    top: 70%;
                    font-size: 22.6888px;
                    text-align: center;
                }
            }
        }

        .onsite-foot {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 40%;

            .tips {
                position: relative;
                left: 50%;
                bottom: 0%;
                width: 100%;
                text-align: center;
                transform: translate(-50%, 0%);
                -webkit-transform: translate(-50%, 0%);

                p {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    -webkit-transform: translate(-50%, -50%);
                    // width: 100%;
                    // line-height: 60px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    font-style: normal;
                    color: #2888de;
                }

                .onsite-p1 {
                    left: 42%;
                    top: 25%;
                    font-size: 40px;
                }

                .onsite-p2 {
                    left: 53%;
                    top: 46%;
                    font-size: 30px;
                }

                .onsite-p3 {
                    left: 53.8%;
                    top: 62%;
                    font-size: 30px;
                }

                .onsite-p4 {
                    left: 53%;
                    top: 77%;
                    font-size: 30px;
                }
            }

            .back-btn {
                position: absolute;
                bottom: 6em;
                right: 2em;

                p {
                    position: absolute;
                    top: 10%;
                    // left: 20%;
                    width: 100%;
                    font-family: Source Han Sans CN;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 36px;
                    line-height: 54px;
                    text-align: center;
                    color: #ffffff;
                }
            }
        }
    }
}

@media screen and (min-width: 0px) {
    @include onsite;
}

/* 屏幕最大等于1024 */
@media screen and (min-width: 1024px) and (max-width: 1024px) {
    @include onsite;
}

/* 屏幕最大等于1920 */
@media screen and (min-width: 1920px) and (max-width: 1920px) {
    @include onsite;

    .onsite {
        .onsite-main {
            width: 100%;
            height: 65%;

            ul {
                width: 42%;
                height: 45%;

                li {
                    width: 100%;
                    height: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }

                .record-top {
                    height: 78px;
                    left: 10%;
                    top: 50%;
                    font-size: 72px;
                    line-height: 78px;
                }

                .record-bottom {
                    height: 50px;
                    left: 8%;
                    top: 67%;
                    font-size: 34px;
                    line-height: 50px;
                }

                .registration-top {
                    height: 70px;
                    left: 0%;
                    top: 53%;
                    font-size: 72px;
                    line-height: 70px;
                    transform: rotate(-6deg);
                }

                .registration-bottom {
                    height: 80px;
                    left: 0%;
                    top: 67%;
                    font-size: 34px;
                    line-height: 80px;
                    transform: rotate(-6deg);
                }
            }
        }
    }
}
</style>
