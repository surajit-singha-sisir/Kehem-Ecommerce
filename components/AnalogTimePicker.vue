<template>
  <div class="analog-time-picker" ref="pickerRef">
    <!-- Input to trigger picker -->
    <input
      type="text"
      :value="formattedTime"
      @click="togglePicker"
      placeholder="Select time"
      class="picker-input"
      readonly
    />
    <!-- Clock dropdown -->
    <transition name="fade">
      <div v-if="isOpen" class="clock-dropdown">
        <!-- Clock Face -->
        <div class="clock-face">
          <div
            v-for="hour in 12"
            :key="hour"
            class="hour-mark"
            :style="getHourStyle(hour)"
            :class="{ 'selected': selectedHour === hour || (selectedHour === 0 && hour === 12) }"
            @click="selectHour(hour === 12 && !isPM ? 0 : hour)"
          >
            {{ hour }}
          </div>
          <div
            v-if="showMinutes"
            v-for="minute in minuteMarks"
            :key="minute"
            class="minute-mark"
            :style="getMinuteStyle(minute)"
            :class="{ 'selected': selectedMinute === minute }"
            @click="selectMinute(minute)"
          >
            {{ minute }}
          </div>
          <!-- Clock Hand -->
          <div class="clock-hand" :style="clockHandStyle"></div>
          <div class="clock-center"></div>
        </div>
        <!-- AM/PM Toggle -->
        <div class="ampm-toggle">
          <button :class="{ 'active': !isPM }" @click="isPM = false">AM</button>
          <button :class="{ 'active': isPM }" @click="isPM = true">PM</button>
        </div>
        <!-- Switch between hours and minutes -->
        <div class="mode-toggle">
          <button :class="{ 'active': !showMinutes }" @click="showMinutes = false">Hours</button>
          <button :class="{ 'active': showMinutes }" @click="showMinutes = true">Minutes</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue: Date | null;
}>();
const emit = defineEmits(['update:modelValue']);

// State
const isOpen = ref(false);
const pickerRef = ref<HTMLElement | null>(null);
const selectedHour = ref(12); // 0-23
const selectedMinute = ref(0);
const isPM = ref(false);
const showMinutes = ref(false);

// Formatted time for input
const formattedTime = computed(() => {
  if (selectedHour.value === null || selectedMinute.value === null) return '';
  const hour = selectedHour.value % 12 || 12;
  const period = isPM.value ? 'PM' : 'AM';
  return `${hour}:${String(selectedMinute.value).padStart(2, '0')} ${period}`;
});

// Clock hand style
const clockHandStyle = computed(() => {
  const angle = showMinutes.value
    ? (selectedMinute.value / 60) * 360
    : ((selectedHour.value % 12) / 12) * 360;
  return {
    transform: `translateX(-50%) rotate(${angle}deg)`,
    height: `${showMinutes.value ? 70 : 60}px`, // Shorter for minutes
  };
});

// Minute marks (every 5 minutes)
const minuteMarks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// Positioning for hour and minute marks
const getHourStyle = (hour: number) => {
  const angle = ((hour - 3) / 12) * 360; // Start at 12 o'clock
  return {
    transform: `rotate(${angle}deg) translate(0, -70px) rotate(-${angle}deg)`,
  };
};

const getMinuteStyle = (minute: number) => {
  const angle = (minute / 60) * 360;
  return {
    transform: `rotate(${angle}deg) translate(0, -85px) rotate(-${angle}deg)`,
  };
};

// Methods
const togglePicker = () => {
  isOpen.value = !isOpen.value;
};

const selectHour = (hour: number) => {
  selectedHour.value = isPM.value && hour !== 12 ? hour + 12 : hour;
  showMinutes.value = true;
  updateTime();
};

const selectMinute = (minute: number) => {
  selectedMinute.value = minute;
  updateTime();
  isOpen.value = false;
};

const updateTime = () => {
  const date = new Date();
  date.setHours(selectedHour.value);
  date.setMinutes(selectedMinute.value);
  emit('update:modelValue', new Date(date));
};

// Outside click handler
const handleOutsideClick = (event: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
  if (props.modelValue) {
    selectedHour.value = props.modelValue.getHours();
    selectedMinute.value = props.modelValue.getMinutes();
    isPM.value = selectedHour.value >= 12;
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
.analog-time-picker {
  position: relative;
  display: inline-block;
}

.picker-input {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  width: 220px;
  cursor: pointer;
  background: #ffffff;
  font-size: 15px;
  font-weight: 500;
  color: #374151;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.picker-input:hover {
  border-color: #60a5fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.clock-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  padding: 20px;
  z-index: 20;
  width: 280px;
}

.clock-face {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto;
  border-radius: 50%;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  overflow: hidden; /* Prevent overflow */
}

.hour-mark,
.minute-mark {
  position: absolute;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  left: 50%;
  top: 50%;
  transform-origin: center;
}

.hour-mark:hover,
.minute-mark:hover {
  background: #dbeafe;
  border-radius: 50%;
  color: #1e40af;
}

.selected {
  background: #1e40af;
  color: white;
  border-radius: 50%;
}

.clock-hand {
  position: absolute;
  left: 50%;
  bottom: 50%;
  width: 2px;
  background: #1e40af;
  transform-origin: bottom;
  transition: transform 0.3s ease, height 0.3s ease;
}

.clock-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background: #1e40af;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.ampm-toggle,
.mode-toggle {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 16px;
}

.ampm-toggle button,
.mode-toggle button {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ampm-toggle button.active,
.mode-toggle button.active {
  background: #1e40af;
  color: white;
  border-color: #1e40af;
}

.ampm-toggle button:hover:not(.active),
.mode-toggle button:hover:not(.active) {
  background: #e5e7eb;
}

/* Fade transition for picker */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>