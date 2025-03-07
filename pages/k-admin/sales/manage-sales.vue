<script setup lang="ts">
import { useCookie } from 'nuxt/app'
const { startRefreshing, stopRefreshing, logout } = useAuth();
const accessToken = useCookie<string | null>('access');

onMounted(() => {
    startRefreshing();
});

onUnmounted(() => {
    stopRefreshing();
});


// const products = await $fetch<{ message: string }>('http://192.168.0.111:3000/api/home', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${accessToken.value ?? ''}`
//   }
// });


const fromDate = ref<Date | null>(null);
const toDate = ref<Date | null>(null);

const periodFilter = () => {
    console.log('From:', fromDate.value, 'To:', toDate.value);
};

</script>



<template>
    <section class="sales">

        <h3 class="text-center pad--10 border-bottom">Sales Manager</h3>
        <div class="f f-col m-t--10">

            <div class="filtered">
                <aside class="time-filter">
                    <div>
                        <span class="time-session">Today</span>
                        <span class="time-session active">Week</span>
                        <span class="time-session">Month</span>
                        <span class="time-session">Total</span>
                    </div>
                </aside>

                <aside class="period">
                    <div class="inner-period">
                        <p>From</p>
                        <DateTimePicker v-model="fromDate" />
                    </div>
                    <div class="inner-period">
                        <p>To</p>
                        <DateTimePicker v-model="toDate" />
                    </div>
                    <button type="button" class="btn btn-rain btn-sm" @click="periodFilter">
                        <i class="m-filter"></i> Filter
                    </button>
                </aside>
            </div>

            <div class="sales-amount border-all">
                <div class="text-set">
                    <b>Total Sold Amounts</b>
                </div>
                <div class="amount">
                    <span>
                        <b>400.00</b>
                        <b>BDT</b>
                    </span>
                    <div>
                        <p class="increased">increased 20%</p>
                        <!-- <p class="decreased">decrease 20%</p> -->
                    </div>
                </div>
            </div>

            <aside class="outer-table">
                <h3 class="f-start-center gap-05"><i class="m-stats-bars2"></i>
                    <p>Total Sales Summary</p>
                </h3><br>
                <table class="table table-2">
                    <thead>
                        <tr>
                            <th colspan="5">Sales Summery</th>
                        </tr>
                        <tr>
                            <th>SL</th>
                            <th>Product</th>
                            <th>Total Sales</th>
                            <th>Revenue</th>
                            <th>Total Customers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Something</td>
                            <td>Something</td>
                            <td>Something</td>
                            <td>Something</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Something</td>
                            <td>Something</td>
                            <td>Something</td>
                            <td>Something</td>
                        </tr>
                    </tbody>
                </table>
            </aside>
        </div><br>

        <h3 class="f-start-center gap-05"><i class="m-file-text1"></i>
            <p>Top Customers List</p>
        </h3>
        <aside class="outer-table">
            <table class="table table-3">
                <thead>
                    <tr>
                        <th colspan="5">Top Customers</th>
                    </tr>
                    <tr>
                        <th>SL</th>
                        <th>Product</th>
                        <th>Total Sales</th>
                        <th>Revenue</th>
                        <th>Total Customers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Something</td>
                        <td>Something</td>
                        <td>Something</td>
                        <td>Something</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Something</td>
                        <td>Something</td>
                        <td>Something</td>
                        <td>Something</td>
                    </tr>
                </tbody>
            </table>
        </aside>
    </section>
</template>



<style lang="scss">
.outer-table {
    position: relative;
    width: 100%;
    overflow-x: auto;
    padding: 2rem 0;
    scrollbar-width: thin;
    scrollbar-color: #c4c4c4 transparent;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #c5d9f8;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #246fd8;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
            background: #246fd8;
        }
    }

    .table-2 {
        width: 100%;
        overflow-x: auto;
        border-collapse: collapse;

        thead {
            tr {
                background-color: #c5d9f8;

                th {
                    color: #313131;
                    padding: 1rem;
                }

                &:nth-child(even) {
                    background-color: #246fd8;

                    th {
                        color: #fff;
                    }
                }
            }
        }

        tbody {
            tr {
                td {
                    padding: 1rem;
                }
            }
        }
    }

    .table-3 {
        width: 100%;
        overflow-x: auto;
        border-collapse: collapse;

        thead {
            tr {
                background-color: #eee8b0;

                th {
                    color: #313131;
                    padding: 1rem;
                }

                &:nth-child(even) {
                    background-color: #1c8796;

                    th {
                        color: #fff;
                    }
                }
            }
        }

        tbody {
            tr {
                td {
                    padding: 1rem;
                }
            }
        }
    }
}





.border-bottom {
    border-bottom: 1px solid #ccc;
}

.sales {
    position: relative;
    width: 100%;

    .filtered {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 0;

        .time-filter {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border: 1px solid #ccc;

                .time-session {
                    display: block;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;

                    &:hover {
                        background-color: #dbe0f3;
                    }
                }

                .active {
                    background-color: #9aaaf1;
                    border: none;

                    &:hover {
                        background-color: #9aaaf1;
                    }
                }
            }
        }

        .period {
            display: flex;
            align-items: flex-end;
            gap: 0.5rem;

            .inner-period {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;

                input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                }
            }

            button {
                height: 2.3rem;
            }
        }
    }

    .sales-amount {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem 1rem;
        background-color: #fafafa;
        // background-image: url(/images/props-1.png);
        // background-position: right bottom;
        // background-size: cover;
        // background-repeat: no-repeat;


        .text-set {
            font-size: 1.2rem;
            color: #1e3d52;
        }

        .amount {
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            span {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                b:first-child {
                    font-size: 2.5rem;
                }
            }

            div {
                display: flex;
                gap: 1rem;

                p {
                    font-size: 0.8rem;
                }

                .increased {
                    color: #0a6894;
                }

                .decreased {
                    color: #d40808;
                }
            }
        }
    }
}

@media screen and (max-width: 720px) {
    .filtered {
        justify-content: center !important;
        flex-wrap: wrap;
    }

    .period {
        justify-content: center !important;
        flex-wrap: wrap;
    }
}

@media screen and (max-width: 520px) {
    .filtered {
        justify-content: center !important;
        flex-wrap: wrap;
    }
}
</style>