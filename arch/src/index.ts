import { ArchGenerator } from '@drax/arch';

//Import schemas
import { AgenteIASchema } from './schemas/agents/AgenteIASchema';

const schemas = [
    AgenteIASchema,
];

const generator = new ArchGenerator(schemas);
generator.build()
