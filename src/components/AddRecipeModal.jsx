import { useForm } from "react-hook-form";
import { useRecipes } from "../contexts/recipesContext";
import { useCreateRecipe } from "../hooks/useCreateRecipe";

function AddRecipeModal() {
  const { closeModal, setRecipeId } = useRecipes();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      publisher: "All Recipes",

      "ingredient-1": "3,cups,bread",
      "ingredient-2": "1,,envelope active dry yeast",
      "ingredient-3": "1.25,cups,warm water",
      "ingredient-4": "3,tbsps,extra virgin olive oil divided",
      "ingredient-5": "3,tbsps,chopped fresh rosemary",
      "ingredient-6": "1,,can pizza sauce",
      source_url: "http://allrecipes.com/Recipe/Valentine-Pizza/Detail.aspx",
      image_url: "http://forkify-api.herokuapp.com/images/7988559586.jpg",
      title: "Valentine Pizza",
      servings: 4,
      cooking_time: 75,
    },
  });

  const { createRecipe, isPending } = useCreateRecipe();

  const onSubmit = async (data) => {
    const ingredients = Array.from({ length: 6 }, (_, i) => {
      let item = data[`ingredient-${i + 1}`];
      delete data[`ingredient-${i + 1}`];
      if (!item) return undefined;

      const [quantity, unit, description] = item.split(",");

      if (!description) return undefined;

      return {
        quantity: +quantity || null,
        unit: unit || null,
        description: description || null,
      };
    }).filter((item) => item);

    data.ingredients = ingredients;
    data.cooking_time = +data.cooking_time;
    data.servings = +data.servings;

    createRecipe(data, {
      onSuccess: (data) => {
        closeModal();
        setRecipeId(data.id);
      },
    });
  };
  return (
    <div className="fixed top-0 left-0 z-20 h-screen w-full">
      <div className="relative">
        <div
          className="absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-neutral-600/50 backdrop-blur-[2px]"
          onClick={closeModal}
        >
          <div
            className="relative h-fit w-3xl rounded-md bg-white px-8 py-6 shadow-2xl"
            onClick={(evnt) => evnt.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:stroke-[#f48c82]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-8">
                <div className="flex w-1/2 flex-col gap-2">
                  <h2 className="font-semibold text-neutral-700 uppercase">
                    Recipe Data
                  </h2>
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] text-neutral-700">
                      Title
                    </label>
                    <input
                      type="text"
                      className="rounded-sm border-2 border-neutral-200 px-2 py-0.5 placeholder:text-[10px] placeholder:text-neutral-300 focus:bg-[#fdf1ef] focus:outline-[#f7c7c0]"
                      {...register("title")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] text-neutral-700">URl</label>
                    <input
                      type="text"
                      className="rounded-sm border-2 border-neutral-200 px-2 py-0.5 placeholder:text-[10px] placeholder:text-neutral-300 focus:bg-[#fdf1ef] focus:outline-[#f7c7c0]"
                      {...register("source_url")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] text-neutral-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="rounded-sm border-2 border-neutral-200 px-2 py-0.5 placeholder:text-[10px] placeholder:text-neutral-300 focus:bg-[#fdf1ef] focus:outline-[#f7c7c0]"
                      {...register("image_url")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] text-neutral-700">
                      Publisher
                    </label>
                    <input
                      type="text"
                      className="rounded-sm border-2 border-neutral-200 px-2 py-0.5 placeholder:text-[10px] placeholder:text-neutral-300 focus:bg-[#fdf1ef] focus:outline-[#f7c7c0]"
                      {...register("publisher")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] text-neutral-700">
                      Prep time
                    </label>
                    <input
                      type="number"
                      className="rounded-sm border-2 border-neutral-200 px-2 py-0.5 placeholder:text-[10px] placeholder:text-neutral-300 focus:bg-[#fdf1ef] focus:outline-[#f7c7c0]"
                      {...register("cooking_time")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] text-neutral-700">
                      Servings
                    </label>
                    <input
                      type="number"
                      className="rounded-sm border-2 border-neutral-200 px-2 py-0.5 placeholder:text-[10px] placeholder:text-neutral-300 focus:bg-[#fdf1ef] focus:outline-[#f7c7c0]"
                      {...register("servings")}
                    />
                  </div>
                </div>
                <div className="flex w-1/2 flex-col gap-2">
                  <h2 className="font-semibold text-neutral-700 uppercase">
                    Ingredients
                  </h2>
                  {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                    <div
                      className="flex items-center justify-between gap-6"
                      key={item}
                    >
                      <label className="text-[12px] text-neutral-700">{`Ingredient ${item}`}</label>
                      <input
                        type="text"
                        className="grow rounded-sm border-2 border-neutral-200 px-2 py-0.5 placeholder:text-[10px] placeholder:text-neutral-300 focus:bg-[#fdf1ef] focus:outline-[#f7c7c0]"
                        placeholder="Format: 'Quantity,Unit,Description'"
                        {...register(`ingredient-${item}`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fbda89] to-[#f48c82] px-8 py-2 font-medium text-white transition-all duration-100 ease-linear hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                    />
                  </svg>
                  <span className="text-[12px] uppercase">
                    {isPending ? "Uploading..." : "Upload"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeModal;
