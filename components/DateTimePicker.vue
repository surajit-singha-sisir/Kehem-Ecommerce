<template>
    <!-- <DateTimePicker v-model="selectedDate" />
    <p>Selected: {{ selectedDate ? selectedDate.toLocaleString() : 'None' }}</p> -->
    <div class="datetime-picker" ref="pickerRef">
        <!-- Input to trigger picker -->
        <input type="text" :value="formattedDate" @click="togglePicker" placeholder="Select a date" class="picker-input"
            readonly />
        <!-- Picker dropdown -->
        <transition name="fade">
            <div v-if="isOpen" class="picker-dropdown">
                <!-- Calendar Header with Year Picker -->
                <div class="calendar-header">
                    <button @click="prevMonth" class="nav-btn">
                        <i class="m-chevron-left"></i>
                    </button>
                    <div class="month-year">
                        <select v-model="currentMonth" class="month-select" @change="updateCalendar">
                            <option v-for="(month, index) in monthNames" :key="month" :value="index">
                                {{ month }}
                            </option>
                        </select>
                        <select v-model="currentYear" class="year-select" @change="updateCalendar">
                            <option v-for="year in yearOptions" :key="year" :value="year">
                                {{ year }}
                            </option>
                        </select>
                    </div>
                    <button @click="nextMonth" class="nav-btn">
                        <i class="m-chevron-right"></i>
                    </button>
                </div>
                <!-- Calendar Days -->
                <div class="calendar-days">
                    <span v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="day-name">
                        {{ day }}
                    </span>
                </div>
                <!-- Calendar Dates with Directional Transition -->
                <transition :name="transitionDirection" mode="out-in">
                    <div :key="`${currentMonth}-${currentYear}`" class="calendar-dates">
                        <span v-for="date in calendarDates" :key="date.day" :class="{
                            'date-cell': true,
                            'disabled': date.disabled || isFutureDate(date),
                            'selected': isSelected(date),
                        }" @click="selectDate(date)">
                            {{ date.day }}
                        </span>
                    </div>
                </transition>
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
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const selectedDate = ref<Date | null>(props.modelValue);
const pickerRef = ref<HTMLElement | null>(null);
const transitionDirection = ref('slide-right'); // Default transition

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

// Year options (up to current year)
const yearOptions = computed(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: current - 2000 + 1 }, (_, i) => 2000 + i); // From 2000 to current year
});

// Calendar logic
const calendarDates = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
    const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
    const dates = [];

    for (let i = 0; i < firstDay; i++) {
        dates.push({ day: '', disabled: true });
    }
    for (let day = 1; day <= daysInMonth; day++) {
        dates.push({ day, disabled: false });
    }
    return dates;
});

// Formatted date for input
const formattedDate = computed(() => {
    return selectedDate.value ? selectedDate.value.toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric'
    }) : '';
});

// Methods
const togglePicker = () => {
    isOpen.value = !isOpen.value;
};

const prevMonth = () => {
    transitionDirection.value = 'slide-left';
    currentMonth.value--;
    if (currentMonth.value < 0) {
        currentMonth.value = 11;
        currentYear.value--;
    }
};

const nextMonth = () => {
    if (currentYear.value === new Date().getFullYear() && currentMonth.value >= new Date().getMonth()) return;
    transitionDirection.value = 'slide-right';
    currentMonth.value++;
    if (currentMonth.value > 11) {
        currentMonth.value = 0;
        currentYear.value++;
    }
};

const updateCalendar = () => {
    // Ensure we don't go past the current month/year
    if (currentYear.value === new Date().getFullYear() && currentMonth.value > new Date().getMonth()) {
        currentMonth.value = new Date().getMonth();
    }
};

const isSelected = (date: { day: number | string; disabled: boolean }) => {
    if (!selectedDate.value || date.disabled) return false;
    const d = new Date(currentYear.value, currentMonth.value, date.day as number);
    return d.toDateString() === selectedDate.value.toDateString();
};

const isFutureDate = (date: { day: number | string; disabled: boolean }) => {
    if (date.disabled) return false;
    const d = new Date(currentYear.value, currentMonth.value, date.day as number);
    return d > new Date(); // Disable dates after today
};

const selectDate = (date: { day: number | string; disabled: boolean }) => {
    if (date.disabled || isFutureDate(date)) return;
    selectedDate.value = new Date(currentYear.value, currentMonth.value, date.day as number);
    emit('update:modelValue', new Date(selectedDate.value));
    isOpen.value = false;
};

// Hide picker on outside click
const handleOutsideClick = (event: MouseEvent) => {
    if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleOutsideClick);
    if (props.modelValue) {
        selectedDate.value = new Date(props.modelValue);
        currentMonth.value = selectedDate.value.getMonth();
        currentYear.value = selectedDate.value.getFullYear();
    }
});

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
.datetime-picker {
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

.picker-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    padding: 16px;
    z-index: 20;
    width: 300px;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #f8fafc;
    /* Light slate background */
    border-radius: 8px;
    margin-bottom: 12px;
}

.nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    font-size: 18px;
    color: #475569;
    transition: color 0.2s ease;
}

.nav-btn:hover {
    color: #1e3a8a;
}

.month-year {
    display: flex;
    gap: 10px;
}

.month-select,
.year-select {
    border: none;
    background: none;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
}

.month-select:hover,
.year-select:hover {
    background: #e2e8f0;
}

.calendar-days,
.calendar-dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
}

.day-name {
    font-size: 13px;
    color: #6b7280;
    font-weight: 600;
    padding: 4px;
}

.date-cell {
    padding: 10px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.date-cell:hover:not(.disabled) {
    background: #dbeafe;
    color: #1e40af;
}

.selected {
    background: #1e40af;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.disabled {
    color: #d1d5db;
    cursor: not-allowed;
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

/* Slide transitions for month change */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-right-enter-from,
.slide-left-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.slide-right-leave-to,
.slide-left-enter-from {
    transform: translateX(-20px);
    opacity: 0;
}
</style>