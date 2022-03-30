<template>
    <header>
        <h1>Coach Finder</h1>
    </header>
</template>

<script>
export default {
    
}
</script>


<style scoped>
header {
  height: 5rem;
  background-color: rgb(108, 130, 148);
  margin: 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header h1 {
    text-align: center;
    color: aliceblue;
    margin: 10%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: center;
  align-items: center;
}

li {
  margin: 0 1rem;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.25rem;
}

a:hover,
a:active,
a.router-link-active {
  color: #45006d;
  border-color: #45006d;
}

button {
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border: 1px solid #45006d;
  background-color: transparent;
  color: #45006d;
  border-radius: 30px;
}

button:hover,
button:active {
  background-color: #f0d5ff;
}
</style>
