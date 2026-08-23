import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGallery,
  useCreateGalleryItem,
  useDeleteGalleryItem,
  useSports,
} from "@/hooks/useAppData";
import { uploadImage } from "@/services/api";
import {
  FiUpload,
  FiTrash2,
  FiLoader,
  FiImage,
  FiArrowLeft,
  FiCheckSquare,
  FiSquare,
} from "react-icons/fi";
import { toast } from "sonner";

const ManageGallery = () => {
  const { data: gallery = [], isLoading } = useGallery();
  const { data: sports = [] } = useSports();

  const createItem = useCreateGalleryItem();
  const deleteItem = useDeleteGalleryItem();

  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // ============================================================
  // GROUP GALLERY IMAGES BY SPORT
  // ============================================================

  const sportGroups = sports.map((sport: any) => ({
    ...sport,
    images: gallery.filter(
      (img: any) => String(img.sport_id) === String(sport.id)
    ),
  }));

  const currentImages = selectedSport
    ? gallery.filter(
        (img: any) => String(img.sport_id) === String(selectedSport)
      )
    : [];

  const selectedSportData = sports.find(
    (sport: any) => String(sport.id) === String(selectedSport)
  ) as any;

  // ============================================================
  // MULTI IMAGE UPLOAD
  // ============================================================

  const handleMultiUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    if (!selectedSport) {
      toast.error("Please select a sport first.");
      return;
    }

    console.log(
      "Gallery files selected:",
      Array.from(files)
    );

    console.log(
      "Gallery file details:",
      Array.from(files).map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        isFile: file instanceof File,
      }))
    );

    setUploading(true);

    let successCount = 0;
    let failedCount = 0;

    try {
      for (const file of Array.from(files)) {
        try {
          // ------------------------------------------------------
          // VALIDATE FILE
          // ------------------------------------------------------

          if (!(file instanceof File)) {
            throw new Error("Selected item is not a valid File.");
          }

          if (file.size > 10 * 1024 * 1024) {
            toast.error(
              `${file.name} is too large. Maximum size is 10MB.`
            );
            failedCount++;
            continue;
          }

          if (!file.type.startsWith("image/")) {
            toast.error(
              `${file.name} is not a valid image.`
            );
            failedCount++;
            continue;
          }

          // ------------------------------------------------------
          // UPLOAD ACTUAL FILE
          //
          // IMPORTANT:
          // api.ts uploadImage() expects:
          //
          // uploadImage(file, bucket)
          //
          // DO NOT convert the File to base64 here.
          // api.ts handles that internally.
          // ------------------------------------------------------

          console.log(
            `Uploading ${file.name} to Google Drive...`
          );

          const uploadResult = await uploadImage(
            file,
            "gallery"
          );

          console.log(
            `Upload result for ${file.name}:`,
            uploadResult
          );

          if (
            !uploadResult ||
            !uploadResult.success ||
            !uploadResult.url
          ) {
            throw new Error(
              uploadResult?.error ||
                uploadResult?.message ||
                "Image upload failed"
            );
          }

          // ------------------------------------------------------
          // CREATE GOOGLE SHEETS GALLERY RECORD
          // ------------------------------------------------------

          const caption = file.name.replace(
            /\.[^/.]+$/,
            ""
          );

          await createItem.mutateAsync({
            url: uploadResult.url,
            sport_id: selectedSport,
            caption,
            date: new Date()
              .toISOString()
              .split("T")[0],
          } as any);

          successCount++;

          console.log(
            `Gallery image saved successfully: ${file.name}`
          );
        } catch (error: any) {
          console.error(
            `Gallery upload error for ${file.name}:`,
            error
          );

          failedCount++;

          toast.error(
            `Failed to upload ${file.name}: ${
              error?.message || "Unknown error"
            }`
          );
        }
      }

      // ----------------------------------------------------------
      // FINAL RESULT
      // ----------------------------------------------------------

      if (successCount > 0) {
        toast.success(
          `${successCount} image${
            successCount === 1 ? "" : "s"
          } uploaded successfully!`
        );
      }

      if (failedCount > 0) {
        toast.error(
          `${failedCount} image${
            failedCount === 1 ? "" : "s"
          } failed to upload.`
        );
      }
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  // ============================================================
  // SELECT IMAGE
  // ============================================================

  const toggleSelect = (id: string) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  // ============================================================
  // SELECT ALL
  // ============================================================

  const selectAll = () => {
    if (
      selectedIds.size === currentImages.length &&
      currentImages.length > 0
    ) {
      setSelectedIds(new Set());
      return;
    }

    setSelectedIds(
      new Set(
        currentImages.map((image: any) =>
          String(image.id)
        )
      )
    );
  };

  // ============================================================
  // BULK DELETE
  // ============================================================

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) {
      return;
    }

    const ids = Array.from(selectedIds);
    const count = ids.length;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${count} selected image${
        count === 1 ? "" : "s"
      }?`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    let successCount = 0;

    try {
      for (const id of ids) {
        try {
          await deleteItem.mutateAsync(id);
          successCount++;
        } catch (error) {
          console.error(
            "Bulk delete error:",
            error
          );
        }
      }

      setSelectedIds(new Set());

      if (successCount > 0) {
        toast.success(
          `${successCount} image${
            successCount === 1 ? "" : "s"
          } deleted successfully!`
        );
      }

      if (successCount < count) {
        toast.error(
          `${count - successCount} image${
            count - successCount === 1 ? "" : "s"
          } could not be deleted.`
        );
      }
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // SINGLE DELETE
  // ============================================================

  const handleDelete = async (
    e: React.MouseEvent,
    id: string
  ) => {
    e.stopPropagation();

    const image = gallery.find(
      (item: any) => String(item.id) === String(id)
    ) as any;

    const confirmed = window.confirm(
      `Delete ${
        image?.caption || "this image"
      } permanently?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteItem.mutateAsync(id);

      setSelectedIds((previous) => {
        const next = new Set(previous);
        next.delete(id);
        return next;
      });

      toast.success(
        "Image deleted successfully"
      );
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Failed to delete image"
      );
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">
        Manage Gallery
      </h1>

      {selectedSport ? (
        // ======================================================
        // SPORT GALLERY
        // ======================================================
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <button
              onClick={() => {
                setSelectedSport(null);
                setSelectedIds(new Set());
              }}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <FiArrowLeft />
              Back to Sports
            </button>

            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                {selectedSportData?.icon}{" "}
                {selectedSportData?.name}

                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({currentImages.length} photos)
                </span>
              </h2>
            </div>
          </div>

          {/* ACTION BAR */}

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() =>
                inputRef.current?.click()
              }
              disabled={uploading}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              {uploading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiUpload />
              )}

              {uploading
                ? "Uploading..."
                : "Upload Images"}
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleMultiUpload}
            />

            {currentImages.length > 0 && (
              <>
                <button
                  onClick={selectAll}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors"
                >
                  {selectedIds.size ===
                    currentImages.length ? (
                    <FiCheckSquare />
                  ) : (
                    <FiSquare />
                  )}

                  {selectedIds.size ===
                  currentImages.length
                    ? "Deselect All"
                    : "Select All"}
                </button>

                {selectedIds.size > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    disabled={deleting}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm hover:bg-destructive/90 transition-colors"
                  >
                    {deleting ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      <FiTrash2 />
                    )}

                    Delete {selectedIds.size}{" "}
                    Selected
                  </button>
                )}
              </>
            )}
          </div>

          {/* IMAGE GRID */}

          {currentImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {currentImages.map(
                  (img: any) => {
                    const imageId = String(
                      img.id
                    );

                    const isSelected =
                      selectedIds.has(
                        imageId
                      );

                    return (
                      <motion.div
                        key={imageId}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        className={`relative group rounded-xl overflow-hidden border-2 aspect-square cursor-pointer transition-all ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() =>
                          toggleSelect(
                            imageId
                          )
                        }
                      >
                        <img
                          src={img.url}
                          alt={
                            img.caption ||
                            "Gallery image"
                          }
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />

                        {/* CHECKBOX */}

                        <div className="absolute top-2 left-2">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-foreground/30 text-white opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            {isSelected ? (
                              <FiCheckSquare className="w-4 h-4" />
                            ) : (
                              <FiSquare className="w-4 h-4" />
                            )}
                          </div>
                        </div>

                        {/* CAPTION */}

                        {img.caption && (
                          <div className="absolute bottom-0 inset-x-0 bg-foreground/60 text-white text-xs px-2 py-1 truncate">
                            {img.caption}
                          </div>
                        )}

                        {/* DELETE */}

                        <button
                          onClick={(e) =>
                            handleDelete(
                              e,
                              imageId
                            )
                          }
                          disabled={
                            deleteItem.isPending
                          }
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete image"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    );
                  }
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 rounded-xl border-2 border-dashed border-border text-muted-foreground gap-3">
              <FiImage className="w-12 h-12" />

              <p className="text-lg font-medium">
                No images yet
              </p>

              <p className="text-sm">
                Click "Upload Images" to add
                photos for this sport
              </p>
            </div>
          )}
        </div>
      ) : (
        // ======================================================
        // SPORT FOLDERS
        // ======================================================
        <div>
          <p className="text-muted-foreground mb-6">
            Select a sport to manage its
            gallery images.
          </p>

          {sportGroups.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sportGroups.map(
                (
                  sport: any,
                  index: number
                ) => (
                  <motion.div
                    key={sport.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.04,
                    }}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                    }}
                    onClick={() =>
                      setSelectedSport(
                        String(sport.id)
                      )
                    }
                    className="admin-card cursor-pointer group text-center"
                  >
                    <div className="text-4xl mb-3">
                      {sport.icon}
                    </div>

                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {sport.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      {sport.images.length}{" "}
                      {sport.images.length ===
                      1
                        ? "photo"
                        : "photos"}
                    </p>

                    {sport.images.length >
                      0 && (
                      <div className="flex justify-center gap-1 mt-3">
                        {sport.images
                          .slice(0, 3)
                          .map(
                            (
                              img: any
                            ) => (
                              <img
                                key={
                                  img.id
                                }
                                src={
                                  img.url
                                }
                                alt=""
                                className="w-8 h-8 rounded object-cover"
                              />
                            )
                          )}

                        {sport.images
                          .length > 3 && (
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                            +
                            {sport.images
                              .length -
                              3}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 rounded-xl border-2 border-dashed border-border text-muted-foreground">
              <FiImage className="w-12 h-12 mb-3" />

              <p className="text-lg font-medium">
                No sports found
              </p>

              <p className="text-sm">
                Add sports first before
                managing gallery images.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageGallery;