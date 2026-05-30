<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    icons: {
        type: Array,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');

const filteredIcons = computed(() => {
    if (!searchQuery.value) {
        return props.icons;
    }

    return props.icons.filter(icon =>
        icon.palabras_clave.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const selectIcon = (icon) => {
    emit('update:modelValue', icon);
    searchQuery.value = '';
};

const clearSearch = () => {
    searchQuery.value = '';
};
</script>

<template>
    <div class="icon-picker-container">
        <div class="icon-picker-header">
            <label class="form-label mb-2">Selecciona un ícono</label>
            <div class="input-group">
                <span class="input-group-text"><i class="fas fa-search"></i></span>
                <input
                    v-model="searchQuery"
                    type="text"
                    class="form-control"
                    placeholder="Buscar ícono..."
                />
                <button
                    v-if="searchQuery"
                    @click="clearSearch"
                    type="button"
                    class="btn btn-outline-secondary"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>

        <div class="icon-picker-display">
            <div v-if="modelValue" class="selected-icon-preview">
                <div class="preview">
                <p class="small text-muted mb-1 me-3">Ícono seleccionado:</p>

                    <i :class="[modelValue]" style="font-size: 2rem;"></i>
                    <span class="ms-2 align-self-center">{{ modelValue }}</span>
                </div>
            </div>
        </div>

        <div class="icon-picker-grid">
            <div
                v-if="filteredIcons.length === 0"
                class="no-results text-center py-4"
            >
                <p class="text-muted">No se encontraron íconos</p>
            </div>

            <button
                v-for="icon in filteredIcons"
                :key="icon.clase"
                @click="selectIcon(icon.clase)"
                :class="['icon-btn', { active: modelValue === icon.clase }]"
                type="button"
                :title="icon.palabra_clave"
            >
                <i :class="[icon.clase]"></i>
            </button>
        </div>

        <div class="icon-picker-footer">
            <small class="text-muted">Total: {{ filteredIcons.length }} íconos</small>
        </div>
    </div>
</template>

<style scoped>
.icon-picker-container {
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    padding: 1rem;
    background-color: #f8f9fa;
}

.icon-picker-header {
    margin-bottom: 1rem;
}

.icon-picker-header .input-group {
    margin-top: 0.5rem;
}

.icon-picker-display {
    margin-bottom: 1rem;
}

.selected-icon-preview {
    background-color: white;
    border: 2px solid #0d6efd;
    border-radius: 0.375rem;
    padding: 0.75rem;
}

.selected-icon-preview .preview {
    display: flex;
    align-items: center;
    color: #0d6efd;
}

.icon-picker-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
    gap: 0.3rem;
    max-height: 150px;
    overflow-y: auto;
    padding: 0.3rem;
    background-color: white;
    border-radius: 0.375rem;
    border: 1px solid #e9ecef;
}

.icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    border: 2px solid #e9ecef;
    background-color: white;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    color: #495057;
}

.icon-btn:hover {
    border-color: #0d6efd;
    background-color: #f0f6ff;
    color: #0d6efd;
    transform: scale(1.05);
}

.icon-btn.active {
    border-color: #0d6efd;
    background-color: #0d6efd;
    color: white;
}

.no-results {
    grid-column: 1 / -1;
    color: #6c757d;
}

.icon-picker-footer {
    text-align: center;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e9ecef;
}

/* Custom scrollbar */
.icon-picker-grid::-webkit-scrollbar {
    width: 6px;
}

.icon-picker-grid::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.icon-picker-grid::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.icon-picker-grid::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>