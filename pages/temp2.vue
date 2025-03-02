<style lang="scss">
.attribute-value-tr324 {
  z-index: 5;

  .attribute-value-insert {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    span.placeholder {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5rem;
      height: 2rem;
      background-color: #f7f7f7;
      border: 1px dashed #ccc;
      cursor: pointer;

      &:hover {
        background-color: #c7c7c7;
      }


      .attribute-assigned-name {
        position: absolute;
        left: 50%;
        top: -0.5rem;
        transform: translateX(-50%);
        background-color: #d9ff00;
        padding: 0 5px;
        font-size: 0.7rem;
        border-radius: 10px;
        z-index: 1;
        color: #3a3a3a;
      }
    }

    i {
      color: #a200ff;
      font-size: 1.2rem;
    }

    .linker-line {
      position: relative;
      transition: all 0.2s ease;

      &::after {
        content: '';
        position: absolute;
        left: -1rem;
        top: 50%;
        background-color: #c7c7c7;
        width: 4.3rem;
        aspect-ratio: 1;
        clip-path: polygon(20% 0%, 20% 2%, 2% 2%, 2% 98%, 20% 98%, 20% 100%, 0 100%, 0 0);
      }

    }



    .show-available-values-outer {
      position: absolute;
      width: 10rem;
      left: 120%;
      top: 0;
      border-radius: 0.3rem;
      background-color: #c7c7c7;
      z-index: 4;


      span {
        display: block;
        position: relative;
        width: inherit;
        padding: 0.5rem 0;

        &::before {
          content: '';
          position: absolute;
          left: -0.7rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0.8rem;
          aspect-ratio: 1;
          clip-path: polygon(100% 0, 100% 100%, 0 50%);
          background-color: #c7c7c7;
        }
      }

      .show-available-values {
        position: relative;
        width: 100%;
        height: auto;
        background-color: #f7f7f7;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;

        li {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.5rem;

          &:hover {
            background-color: #e4e4e4;
          }
        }

        li:not(li:last-child) {
          border-bottom: 1px dotted #ccc;
        }
      }
    }

    .attribute-value-assigned {
      background-color: #6200ff !important;

      p {
        color: #fff;
      }
    }
  }




  .btn-disabled {
    cursor: not-allowed;
  }
}

.attribute-value-tr324:hover .attribute-value-insert .placeholder {
  border-color: #ff002b;
  transition: all 0.2s ease;
}

.attribute-value-tr324:hover .linker-line::after {
  background-color: #ff002b;
  transition: all 0.2s ease;
}
</style>

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
