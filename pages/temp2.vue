<template>

    <!-- SELECT ATTRIBUTE -->
    <div class="pad--10 b-b-e m-b--10">

        <!-- ATTRIBUTE VALUES -->
        <div class="b-e pad--10 f f-just-between f-align-items-center gap-10">
            <section class="f f-wrap gap-10" id="attributeValues">

            </section>
            <div class="relative w-100">
                <button id="addAttributeBtn" type="button"
                    class="pad-tb--03 pad-lr--08 plus b-none bg-hov-Purple cur-pointer text--m">+</button>

                <!-- ADD VALUE -->
                <div id="newValueAssigning" class="absolute hide b-e bg-2 f f-col gap-10 w--150 pad--10">
                    <!-- COMBOBOX -->
                    <div class="combo-box">
                        <div class="Combo-inputbox">
                            <input type="text" id="newValueAssigningInput" class="combo-input" data-target=""
                                placeholder="-- Atributes --" data-combo-id="combo3">
                            <ul class="combo-options" id="newValueAssigningOptions" style="display: none;">
                                <li class="no-data" style="display: none;">No data found!</li>
                            </ul>
                        </div>
                    </div>
                    <!-- INPUT VALUE -->
                    <div class="text-input">
                        <input type="text" id="attributeValueOption" placeholder="Variable Name">
                    </div>
                    <!-- SUBMIT BUTTON -->
                    <button id="addNewAttributeValue">Submit</button>
                </div>
            </div>
        </div>

        <!-- ATTRIBUTE VALUES DETAILS -->
        <section class="b-e pad--10 m-t--10 hide" id="attributeSection">
            <table class="attributeTable">
                <thead>
                    <tr>
                        <th id="attributeCat">Size</th>
                        <th>Stock(Qty)</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </section>

    </div>


</template>