<template>

	
	
<aside :class="`${is_expanded && 'is-expanded'}`">
	<h3>Progress Monitoring System</h3>
	<i class="pi pi-user" style="font-size: 2rem padding: auto; padding-bottom: 2rem;"></i>


	<div class="menu-toggle-wrap">
		<button class="menu-toggle" @click="ToggleMenu">
			<i class="pi pi-angle-double-right" style="font-size: 2rem;"></i>
		</button>
	</div>

	<h3>Menu</h3>
	<div class="menu">
		<router-link class="button" to="/">
			<span class="material-icons">space_dashboard</span>
			<span class="text">Dashboard</span>
		</router-link>
		<router-link class="button" to="/Survey">
			<span class="material-icons">table_chart</span>
			<span class="text">Survey</span>
		</router-link>
		<router-link class="button" to="/team">
			<span class="material-icons">group</span>
			<span class="text">Team</span>
		</router-link>
		<router-link class="button" to="/contact">
			<span class="material-icons">email</span>
			<span class="text">Contact</span>
		</router-link>
	</div>

	<div class="flex"></div>

	<div class="menu">
		<router-link class="button" to="/Settings">
			<span class="material-icons">settings</span>
			<span class="text">Settings</span>
		</router-link>
	</div>
</aside>
</template>




<script setup>
	import { ref } from 'vue';
	import 'primeicons/primeicons.css'
	

	const is_expanded = ref (localStorage.getItem("is_expanded") === "true")
	const ToggleMenu = () => {
		is_expanded.value = !is_expanded.value

		localStorage.setItem("is_expanded", is_expanded.value)
	}
</script>

<style lang="scss" scoped>

aside {
	display: flex;
	flex-direction: column;

	background-color: var(--dark);
	color: var(--light);

	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	.p-display {
		width: 2rem;
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--light);
		font-size: 1rem;
		margin-bottom: 1rem;
		text-transform: uppercase;
		
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: var(--dark-alt);

				.material-icons, .text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons, .text {
					color: var(--primary);
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -4rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3, .button .text {
			opacity: 1;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}
	.pi {
		font-size: 1.5rem;
		transition: 0.2s ease-in-out;
		color: var(--light)
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}

</style>