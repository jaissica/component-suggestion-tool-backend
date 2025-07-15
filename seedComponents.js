const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ComponentMeta = require("./models/ComponentMeta");

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/visa-ui";

const components = [
  {
    name: "Button",
    slug: "button",
    description: "Triggers an action or submits a form.",
    usage: `<Button variant="primary">Click me</Button>`,
    tags: ["button", "click", "submit", "action"],
    category: "Interactive",
  },
  {
    name: "Form",
    slug: "form",
    description: "Wraps input fields and handles submission.",
    usage: `<Form>\n  <Input label="Email" />\n  <Button>Submit</Button>\n</Form>`,
    tags: ["form", "input", "fields", "submit", "button"],
    category: "Form Elements",
  },
  {
    name: "Input",
    slug: "input",
    description: "Accepts typed text or user data.",
    usage: `<Input label="Email" placeholder="Enter your email" />`,
    tags: ["input", "text", "form", "email", "field"],
    category: "Form Elements",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    description: "Toggle between true/false values.",
    usage: `<Checkbox label="I agree to the terms" />`,
    tags: ["checkbox", "boolean", "toggle", "form"],
    category: "Form Elements",
  },
  {
    name: "RadioGroup",
    slug: "radiogroup",
    description: "Select one option from a group.",
    usage: `<RadioGroup name="options" options={["Yes", "No"]} />`,
    tags: ["radio", "radiobutton", "select", "form", "button"],
    category: "Form Elements",
  },
  {
    name: "Select",
    slug: "select",
    description: "Dropdown list to pick one option.",
    usage: `<Select label="Country" options={["USA", "Canada"]} />`,
    tags: ["select", "dropdown", "form", "list"],
    category: "Form Elements",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description: "Displays help text on hover/focus.",
    usage: `<Tooltip text="Info"><Button>Hover me</Button></Tooltip>`,
    tags: ["tooltip", "hover", "info", "help"],
    category: "Feedback",
  },
  {
    name: "ContentCard",
    slug: "contentcard",
    description: "Container to visually group related content.",
    usage: `<ContentCard title="Details">Text content here</ContentCard>`,
    tags: ["card", "content", "layout", "section"],
    category: "Layout",
  },
  {
    name: "Banner",
    slug: "banner",
    description: "Shows success, warning, or error messages.",
    usage: `<Banner status="success">Operation completed</Banner>`,
    tags: ["banner", "alert", "message", "status"],
    category: "Feedback",
  },
  {
    name: "Accordion",
    slug: "accordion",
    description: "Expandable section to reveal content.",
    usage: `<Accordion title="More Info">Hidden content here</Accordion>`,
    tags: ["accordion", "collapse", "expand", "section"],
    category: "Layout",
  },
];

async function seed() {
  try {
    await mongoose.connect(uri);

    await ComponentMeta.deleteMany({});
    await ComponentMeta.insertMany(components);

    console.log("✅ Seeded component metadata successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
