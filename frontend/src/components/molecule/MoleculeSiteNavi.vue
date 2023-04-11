<template>
  <nav>
    <RouterLink :to="{ name: 'PageHome' }">Home</RouterLink>
    <RouterLink :to="{ name: 'PagePlans' }">Plans</RouterLink>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: -16px;

  a {
    position: relative;
    display: inline-flex;
    padding: 8px 16px;
    @include font(1.8rem, 1.8rem, 500);
    text-decoration: none;
    color: colors.$black;
    transition: color 0.3s ease-in-out;

    &::before {
      z-index: 2;
      position: absolute;
      bottom: -24px;
      left: 16px;
      content: "";
      display: flex;
      width: calc(100% - 32px);
      height: 6px;
      background-color: colors.$blue-400;
      opacity: 0;
      transform: scaleX(0.12);
      transition: opacity 0.3s ease-in-out, transform 0s 0.3s ease-in-out;
      will-change: opacity, transform;
    }

    &:hover:not(.router-link-exact-active),
    &:hover:not(.router-link-active) {
      background-color: colors.$white;

      &::before {
        left: 16px;
        width: calc(100% - 32px);
      }
    }

    &.router-link-active,
    &.router-link-exact-active {
      color: colors.$blue-400;
      cursor: default;
      background-color: colors.$white;
    }

    &.router-link-active,
    &.router-link-exact-active,
    &:hover {
      &::before {
        opacity: 1;
        transform: scale(1);
        transition: 0.3s ease-in-out;
        transition-property: opacity, transform;
      }
    }
  }
}
</style>
