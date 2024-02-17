<script lang="ts">
    import { categories, list } from "$lib/list";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { create, insertMultiple, search } from "@orama/orama";
    let input: HTMLInputElement;
    let searched = [];
    let db;
    let filter = 0;

    let different = false;
    async function searching() {
        db = await create({
            schema: {
                name: "string",
                description: "string",
                url: "string",
                category: "number",
            },
        });

        await insertMultiple(db, list);
    }

    searching();

    onMount(() => {
        input.focus();
    });

    const filterAction = (id) => {
        filter = id;
        searchForPackage();
    };

    const filterDefault = () => {
        filter = 0;
        searchForPackage();
    };

    const searchForPackage = async () => {
        const searchResults = await search(db, {
            term: input.value,
            properties: ["name", "description"],
            where:
                filter > 0
                    ? {
                          category: { eq: filter },
                      }
                    : null,
        });
        searched = searchResults.hits ?? [];
        different = true;
    };
</script>

<svelte:head>
    <title>Zig index</title>
    <meta
        name="description"
        content="Indexed and searchable Zig package list"
    />
</svelte:head>
<header>
    <div class="wrapper">
        <div class="logo">
            <button on:click={filterDefault}>
                <img src="logo.svg" alt="Logo" height="45" width="130" />
            </button>
        </div>
        <div class="input">
            <input
                bind:this={input}
                on:input={searchForPackage}
                type="text"
                placeholder="Zon package..."
            />
        </div>
    </div>
</header>
<main>
    <aside>
        <div class="asideContainer">
            <ul>
                {#each categories as category}
                    <li
                        class:asideActive={filter == category.id}
                        on:click={() => filterAction(category.id)}
                    >
                        {category.name}
                    </li>
                {/each}
                <li class="add">
                    <a
                        href="https://github.com/emastho/zon-package-list"
                        target="_blank">Add package</a
                    >
                </li>
            </ul>
        </div>
    </aside>
    <section>
        {#if !different}
            {#each filter < 1 ? list : list.filter((i) => i.category == filter) as items}
                <a href={items.url} target="_blank" class="card">
                    <div class="cardHeader">{items.name}</div>
                    <div class="cardBody">{items.description}</div>
                </a>
            {/each}
        {:else}
            {#each searched as item, index}
                <a href={item.document.url} target="_blank" class="card">
                    <div class="cardHeader">{item.document.name}</div>
                    <div class="cardBody">{item.document.description}</div>
                </a>
            {/each}
        {/if}
    </section>
</main>

<style>
    header {
        height: 80px;
        background-color: #111111;
    }

    .wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        margin-inline: 200px;
    }

    .logo {
        width: 220px;
    }

    input {
        outline: none;
        border-radius: 0;
        border: 0;

        padding: 10px 12px;
        width: 300px;
        background-color: #292929;
        color: white;
        font-size: 14px;
    }

    main {
        margin-top: 32px;
        display: flex;
        margin-inline: 200px;
        align-items: start;
    }

    section {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        width: calc(100% - 220px);
    }

    aside {
        width: 220px;
        height: 100%;
    }
    .asideContainer .asideActive {
        background-color: #f7a41d;
        color: black;
    }

    .asideContainer {
        margin-right: 40px;
    }

    .asideContainer ul {
        margin: 0;
        list-style-type: none;
        padding: 0;
    }

    .asideContainer li {
        cursor: pointer;
        background-color: #404040;
        font-size: 0.9rem;
        color: #cdcdcd;
        padding: 8px 16px;
        margin-bottom: 4px;
    }

    .asideContainer li:hover {
        background-color: #f7a41d;
        color: black;
    }

    .asideContainer .add {
        opacity: 0.3;
    }

    .asideContainer .add:hover {
        opacity: 1;
    }

    .card {
        background-color: #111111;
        padding: 16px;
        flex: 0 0 calc(100% / 3 - 16px);
        text-decoration: none;
        height: 88px;
    }

    .card:hover {
        background-color: black;
    }

    .cardHeader {
        color: #f7a41d;
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .cardBody {
        color: #8a8a8a;

        font-size: 0.8rem;
    }
</style>
