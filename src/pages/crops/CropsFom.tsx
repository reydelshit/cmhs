import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import DefaultCropsImage from '@/assets/default-image.jpg'

export default function CropsForm({
  handleSubmit,
  handleChangeImage,
  handleInputChange,
  image,
  setShowAddCrops,
  error,
  setError,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  image: string | null
  setShowAddCrops: (show: boolean) => void
  error: string
  setError: (error: string) => void
}) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <form
        className="bg-white w-[35rem] h-fit p-4 rounded-md ml-[-15rem]"
        onSubmit={handleSubmit}
      >
        <div className="mb-2">
          <img
            className="w-full  h-[15rem] object-cover rounded-lg mb-4"
            src={image! ? image! : DefaultCropsImage}
          />
          <Label>Image</Label>
          <Input
            required
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            name="crops_img"
          />
        </div>

        <div>
          <Label>Crop name</Label>
          <Input required onChange={handleInputChange} name="crops_name" />
        </div>
        <div>
          <Label>Variety</Label>
          <Input required onChange={handleInputChange} name="variety" />
        </div>
        <div>
          <Label>Planting Method</Label>
          <Input required onChange={handleInputChange} name="planting_method" />
        </div>
        <div>
          <Label>Expectedly Yield: (eg. around 5 months)</Label>
          <Input required onChange={handleInputChange} name="expected_yield" />
        </div>
        <div>
          <Label>Harvesting Calendar (eg. around 5 months)</Label>
          <Input required onChange={handleInputChange} name="harvesting_cal" />
        </div>
        <div>
          <Label>Pesticide Schedule</Label>
          <Input required onChange={handleInputChange} name="pest" />
        </div>

        <div>
          <Label>Observation / Notes</Label>
          <Input required onChange={handleInputChange} name="obnotes" />
        </div>

        <div className="gap-2 flex justify-center">
          <Button
            onClick={() => setShowAddCrops(false)}
            className="mt-2 bg-primary-red  p-2 text-white font-bold w-[8rem]"
          >
            Cancel
          </Button>
          <Dialog>
            <DialogTrigger className="mt-2 bg-primary-yellow text-primary-red font-semibold w-[8rem] p-0 rounded-md">
              Submit
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Are the informations provided are corrrect?
                </DialogTitle>
                <DialogDescription className="flex flex-col text-lg">
                  If the inforrmation is not correct it might cause inaccurate
                  information based on our limited data. It should follow the
                  information from Department of Agriculture.
                  {error && (
                    <span className="text-red-500 my-4">Error: {error}</span>
                  )}
                  <div className="gap-2 flex justify-center items-center mt-[2rem] self-end">
                    <DialogClose asChild>
                      <Button
                        onClick={() => setError('')}
                        type="button"
                        variant="secondary"
                      >
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleSubmit(e as any)
                      }
                      className=" bg-primary-yellow p-2 text-primary-red font-bold w-[8rem self-end"
                    >
                      Submit
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  )
}