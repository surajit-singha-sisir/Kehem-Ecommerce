<template>
    <section class="w-100">
        <NuxtLink to="/k-admin/" class="btn btn-primary">Back</NuxtLink><br>

        <!-- key = HashidsField(real_field_name="id")
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    discount = models.IntegerField()
    stock = models.IntegerField()
    image = models.ImageField(upload_to='product/images')
    image2 = models.ImageField(upload_to='product/images')
    image3 = models.ImageField(upload_to='product/images')
    image4 = models.ImageField(upload_to='product/images')
    image5 = models.ImageField(upload_to='product/images')
    video = models.FileField(upload_to='product/videos')
    short_description = models.CharField(max_length=1000)
    full_description = models.TextField()
   
    # product banner
    banner = models.ImageField(upload_to='product/images')
    banner_title = models.CharField(max_length=100)
    banner_sub_title = models.CharField(max_length=100)
    banner_product_title_image = models.ImageField(upload_to='product/images')
    # dosage
    dosage = models.TextField()
    date = models.DateTimeField(auto_now_add=True,auto_created=True)
    def __str__(self):
        return self.name -->

        <!-- ADD PRODUCT START -->
        <form @submit.prevent="addProduct" id="addProductForm" class="product add-product gap-10"
            enctype="multipart/form-data">


            <!-- LEFT COLUMN -->
            <aside class="relative">

                <!-- PRODUCT TITLE -->
                <section class="relative f-res f-col gap-10 v-space">
                    <label for="product-title" class="star" id="product-title">Product Title</label>
                    <input type="text" name="product-title" id="product-title" placeholder="Type the title of the product">
                </section>

                <!-- CATEGORY -->
                <fieldset class="b-e bg-3 f-res gap-10 w-100 pad--10 m-b--10">
                    <legend class="thislegend star">Category</legend>

                    <!-- CATEGORY -->
                    <div class="combo-box w-100">
                        <div class="Combo-inputbox">
                            <input type="text" name="category" id="category" class="combo-input b-Blue b-1 b-rad--05"
                                placeholder="-- Category --" data-combo-id="combo1" autocomplete="off">
                        </div>
                        <ul class="combo-options" id="categoryOptions">
                            <li class="no-data" style="display: none;">No data found!</li>
                        </ul>
                    </div>
                    
                    <!-- SUB-CATEGORY -->
                    <!-- <div class="option">
                        <select name="sub-category" id="sub-category">
                            <option value="false">-- Sub Cat --</option>
                        </select>
                    </div> -->
                    <!-- SUB-SUB-CATEGORY -->
                    <!-- <div class="option">
                        <select name="sub-sub-category" id="sub-sub-category">
                            <option value="false">-- Sub Sub --</option>
                        </select>
                    </div> -->
                </fieldset>

                <!-- PRICE -->
                <fieldset class="b-e bg-3 f-res gap-10 w-100 pad--10 m-b--10" id="productPrices">
                    <legend class="thislegend star">Product Pricing</legend>

                    <!-- Buy Price -->
                    <div class="text-input" id="text-input">
                        <label for="productBuyPrice">Buy Price</label>
                        <input type="number" class="inputbox" name="buyPrice" placeholder="" id="productBuyPrice">
                    </div>

                    <!-- Selling Price -->
                    <div class="text-input" id="text-input">
                        <label for="productSellingPrice">Selling Price</label>
                        <input type="number" name="sellingPrice" class="inputbox" id="productSellingPrice">
                    </div>

                    <!-- Discount Price -->
                    <div class="text-input" id="text-input">
                        <label for="productDiscountPrice">Discount Price</label>
                        <input type="number" name="discountPrice" class="inputbox" id="productDiscountPrice">
                    </div>

                    <!-- UNIT -->
                    <div class="option">
                        <select class="bg-Currency currency" id="productPricingCurrency" name="priceUnit">
                            <option value="taka" target-currency="৳">৳ Taka</option>
                            <option value="dollar" target-currency="$">$ Dollar</option>
                            <option value="rupee" target-currency="₹">₹ Rupee</option>
                            <option value="euro" target-currency="€">€ Euro</option>
                            <option value="pound" target-currency="£">£ Pound</option>
                            <option value="yuan" target-currency="¥">¥ Yuan</option>
                        </select>
                    </div>
                </fieldset>

                <!-- STOCK -->
                <section class="w-100 f f-just-center b-e pad--10 bg-3" id="productStock">
                    <div class="f-res f-align-items-center f-just-center gap-10 w-80">
                        <span class="f-0 text--m star">Stock</span>
                        <div class="select-option-1">
                            <input class="min-w--20" name="stock" type="number" id="addProductTotalStock"
                                placeholder="Total Quantity">
                            <div class="option">
                                <select name="stockUnit" id="addProductStockUnit">
                                    <option value="Piece">Piece</option>
                                    <option value="Packet">Packet</option>
                                    <option value="Box">Box</option>
                                    <option value="Carton">Carton</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ATTRIBUTES -->
                <fieldset class="attributes w-100 f f-col f-just-center b-e pad--10 bg-3 m-tb--10">
                    <legend>Atributes</legend>

                    <!-- SELECT ATTRIBUTE -->
                    <div class="pad--10 b-b-e m-b--10">
                        <div class="combo-box">
                            <div class="Combo-inputbox">
                                <input type="text" data-target="" name="attribute" id="attrInp" class="combo-input"
                                    placeholder="-- Select Atributes --" data-combo-id="combo1" autocomplete="off">
                                <ul class="combo-options attributeSelect" id="attributeSelect" style="display: none;">
                                    <li class="no-data" style="display: none;">No data found!</li>
                                </ul>
                            </div>
                        </div>

                        <!-- ATTRIBUTE VALUES -->
                        <div class="b-e pad--10 f f-just-between f-align-items-center gap-10">
                            <section class="f f-wrap gap-10" id="attributeValues">

                            </section>
                            <div class="relative w-100">
                                <button id="addAttributeBtn" type="button"
                                    class="pad-tb--03 pad-lr--08 plus b-none bg-hov-Purple cur-pointer text--m">+</button>

                                <!-- ADD VALUE -->
                                <div id="newValueAssigning"
                                    class="absolute hide b-e bg-2 f f-col gap-10 w--150 pad--10">
                                    <!-- COMBOBOX -->
                                    <div class="combo-box">
                                        <div class="Combo-inputbox">
                                            <input type="text" id="newValueAssigningInput" class="combo-input"
                                                data-target="" placeholder="-- Atributes --" data-combo-id="combo3">
                                            <ul class="combo-options" id="newValueAssigningOptions"
                                                style="display: none;">
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
                </fieldset>

                <!-- TEXT EDITOR -->
                <section class="summernote">
                    <span class="text--m star">Description</span><br><br>
                    <textarea class="summernote" name="summerNote" id="summernote"></textarea>
                    <!-- <script>
                        $('#summernote').summernote({
                            placeholder: '1. Introduction <br><br> 2. Describe your product<br><br> <i>Add your product Images and Text Sizes to get Notice</i>',
                            tabsize: 2,
                            height: 200,
                            toolbar: [
                                ['style', ['style']],
                                ['font', ['bold', 'underline', 'clear']],
                                // ['color', ['color']],
                                ['para', ['ul', 'ol', 'paragraph']],
                                ['table', ['table']],
                                ['insert', ['link', 'picture', 'video']],
                                ['view', ['codeview']]
                            ]
                        });
                    </script> -->
                </section>

                <!-- TAGS -->
                <section class="e-tags" id="e-tags">
                    <span class="text--m star">Tags</span>
                    <ul class="e-tag-list">
                        <!-- DYNAMICLLY ADD DATA -->
                        <!-- <li>
                            <p>Bottle</p>
                            <i class="m-m-cross"></i>
                        </li> -->
                    </ul>
                    <!-- INPUT BOX -->
                    <input type="text" class="e-addTagInput" placeholder="Add a new tag">
                </section>

                <!-- FAQ -->
                <section class="e-faqs" id="faqContainer">
                    <span class="text--m star">Frequently Ask Questions (FAQ)</span>
                    <div class="e-faqInputs" id="e-faqInputs">
                        <!-- INPUT BOXS -->
                        <input type="text" class="e-questionInput" id="e-questionInput" placeholder="Question">
                        <textarea name="" id="e-answerInput" class="e-answerInput" placeholder="Answer"></textarea>
                        <!-- ADD BUTTON -->
                        <button class="btn btn-primary w--100 m-auto" id="faqAddBtn">Add</button>
                    </div>
                    <div class="e-faq-preview hide" id="e-faq-preview">
                        <!-- PREVIEW -->
                        <span class="text--m b darkBlue">FAQ Preview</span>
                        <div class="e-faq-preview-box">
                            <!-- DYNAMICLLY ADD DATA -->
                        </div>
                    </div>
                </section>

            </aside>

            <!-- RIGHT COLUMN -->
            <aside class="addProductRightColumn">

                <!-- PRODUCT IMAGES -->
                <section class="e-productImage">
                    <span class="text--m productImagesTitle">Product Images <span class=" star">(0/5)</span></span>

                    <div class="pad--20 m-tb--10 fileInputBox">
                        <input type="file" name="" id="dragAndDropFile" accept=".jpg, .jpeg" multiple>
                        <p class="uploadOrDragImage">Upload or Drag Image</p>
                    </div>


                    <!-- PREVIEW IMAGES -->
                    <div class="dragable-image-container gap-10 hide">
                        <span class="preview-img-container">
                        </span>
                        <span class="preview-img-container">
                        </span>
                        <span class="preview-img-container">
                        </span>
                        <span class="preview-img-container">
                        </span>
                        <span class="preview-img-container">
                        </span>
                    </div>
                </section>
            </aside>
            <!-- SUBMIT FORM -->
            <section class="submitForm">
                <input type="submit" value="Submit" class="btn btn-primary w--200">
            </section>
        </form>
        <!-- ADD PRODUCT END -->
    </section>
</template>

<script setup lang="ts">

</script>