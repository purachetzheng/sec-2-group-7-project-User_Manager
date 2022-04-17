<script setup>
const props = defineProps({
    date: {
        type: String,
        default: 'undefined',
    },
});

const checkDate = (date) => {
  const rTime = date.match(/\d{2}:\d{2}:\d{2}/i)[0];
  const rDate = date.match(/(\d{1,2})[/](\d{1,2})[/](\d{4})/i)[0];
  const today = new Date().toLocaleDateString('th-TH')
  return rDate === today ? rTime.slice(0, -3) : rDate;
}

console.log();

</script>

<template>
    <td>{{ checkDate(props.date) }}</td>
</template>
