import { render, Options } from "pug";
import { SomethingCategory, SomethingFor } from "@domain";

type Data<T extends SomethingCategory> = "data" extends keyof SomethingFor<T>
  ? SomethingFor<T>["data"]
  : {};

const pug = <T extends SomethingCategory>(something: SomethingFor<T>) => render(
  something.file.contents,
  {
    filename: something.file.name,
    ...("data" in something ? something.data : {})
  })

export { pug }