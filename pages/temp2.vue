
<template>
  <!-- 2 ATTRIBUTE VALUES -->
  <table ref="section2Table" class="attributeTable">
    <thead>
      <tr>
        <th colspan="3" class="text--12 Brown bg-Khaki ">Size + Weight
        </th>
      </tr>
      <tr>
        <th>Values</th>
        <th>Stock</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr class="attribute-value-tr324">
        <td class="b">
          <div class="attribute-value-insert">
            <!-- VALUES -->
            <span class="placeholder linker-line attribute-value-assigned" @click="firstAttrValue">
              <span class="attribute-assigned-name">Size</span>
              <p>XL</p>
              <div class="show-available-values-outer" v-if="isFirstAttrValueClicked"
                :class="{ 'hide': !isFirstAttrValueClicked }">
                <span>All Values</span>
                <ul class="show-available-values">
                  <li @click="attrValueSet(index, value)">M</li>
                  <li>L</li>
                  <li>XL</li>
                  <li>XXL</li>
                </ul>
              </div>
            </span>
            <i class="m-plus-alt"></i>
            <span class="placeholder" @click="secondAttrValue">
              <div class="show-available-values-outer" :class="{ 'hide': !isSecondAttrValueClicked }">
                <span>All Values</span>
                <ul class="show-available-values">
                  <li>M</li>
                  <li>L</li>
                  <li>XL</li>
                  <li>XXL</li>
                </ul>
              </div>
            </span>
          </div>
        </td>
        <td>
          <input type="number" v-model="singleValueStock" name="attributeValue" min="1" placeholder="Stock">
        </td>
        <td>
          <button class="btn btn-disabled">100 taka</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const isFirstAttrValueClicked = ref(false);
const isSecondAttrValueClicked = ref(false);

const firstAttrValue = () => {
  isFirstAttrValueClicked.value = !isFirstAttrValueClicked.value;
}

const secondAttrValue = () => {
  isSecondAttrValueClicked.value = !isSecondAttrValueClicked.value;
}
</script>
