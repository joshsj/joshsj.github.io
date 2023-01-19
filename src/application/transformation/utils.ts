import { render, Options } from "pug";
import { SomethingCategory, SomethingFor } from "@domain";

const pug = <T extends SomethingCategory>(something: SomethingFor<T>) =>
  render(something.file.content, {
    filename: something.file.name,
    ...("data" in something ? something.data : {}),
  });

export { pug };
