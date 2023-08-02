import axios from "axios";

const preset_key = "nysiszic";
const cloud_name = "dckx8pbkt";

export async function handleCloudinaryUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  handleValue: (value: string) => void
) {
  const file = event.target.files?.[0];

  if (!file) {
    throw new Error("Nenhum arquivo selecionado.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset_key);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    handleValue(response.data.secure_url);
  } catch (err) {
    console.error(err);
    throw new Error("Ocorreu um erro ao fazer o upload do arquivo.");
  }
}
