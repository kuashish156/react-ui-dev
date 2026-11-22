import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  HeartIcon,
  LockClosedIcon,
  PlusIcon,
  Squares2X2Icon,
  UserIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { createCollection } from "../api/mediaCollection";
import type {
  CaptionPosition,
  CollectionType,
  GalleryFocus,
  GalleryView,
  MediaCollectionRequest,
} from "../types/types";

const collectionTypes = [
  {
    value: "INSTRUCTOR_COLLECTION",
    title: "Instructor",
    description: "Only instructors publish",
    icon: UserIcon,
  },
  {
    value: "CONTRIBUTED_COLLECTION",
    title: "Contributed",
    description: "Members add their own media",
    icon: UserGroupIcon,
  },
  {
    value: "ASSIGNMENT_COLLECTION",
    title: "Assignment",
    description: "Private learner submissions",
    icon: DocumentTextIcon,
  },
  {
    value: "PEER_REVIEW_COLLECTION",
    title: "Peer review",
    description: "Shared learning and feedback",
    icon: ChatBubbleLeftRightIcon,
  },
] as const;

const initialForm: MediaCollectionRequest = {
  collectionName: "",
  description: "",
  displayDescription: true,
  collectionType: "INSTRUCTOR_COLLECTION",
  tags: "",
  maxSizePerItem: 100,
  maxItemsPerGallery: 100,
  maxGalleriesPerUser: 10,
  thumbnailsPerPage: 12,
  thumbnailsPerRow: 3,
  displayFullCaption: true,
  captionPosition: "Bottom",
  galleryFocus: "ALL",
  galleryView: "GRID",
  gridColumns: 3,
  gridRows: 4,
  enforceGalleryDefaults: false,
  visibleToInstructorsOnly: false,
  visibleToInstructorsAfter: 0,
  readOnlyFrom: null,
  readOnlyTo: null,
  allowComments: false,
  allowLikes: false,
  isGraded: false,
};

const MediaCollection = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MediaCollectionRequest>(initialForm);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof MediaCollectionRequest, string>>
  >({});

  const updateField = <K extends keyof MediaCollectionRequest>(
    field: K,
    value: MediaCollectionRequest[K],
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setFieldErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (!newTag) return;
    if (tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) {
      setTagInput("");
      return;
    }
    setTags((previous) => [...previous, newTag]);
    setTagInput("");
    setFieldErrors((previous) => {
      if (!previous.tags) return previous;
      const next = { ...previous };
      delete next.tags;
      return next;
    });
  };

  const removeTag = (tagToRemove: string) => {
    setTags((previous) => previous.filter((tag) => tag !== tagToRemove));
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof MediaCollectionRequest, string>> = {};
    const name = form.collectionName.trim();
    const description = form.description.trim();

    if (!name) {
      errors.collectionName = "Collection name is required.";
    } else if (name.length < 3) {
      errors.collectionName = "Use at least 3 characters.";
    } else if (name.length > 150) {
      errors.collectionName = "Collection name cannot exceed 150 characters.";
    }

    if (!description) {
      errors.description = "Description is required.";
    } else if (description.length < 10) {
      errors.description = "Use at least 10 characters.";
    }

    if (tags.length === 0) {
      errors.tags = "Add at least one tag.";
    }

    if (!form.collectionType) {
      errors.collectionType = "Select a collection type.";
    }
    if (!form.galleryView) {
      errors.galleryView = "Select a gallery view.";
    }
    if (!form.galleryFocus) {
      errors.galleryFocus = "Select a media focus.";
    }
    if (!form.captionPosition) {
      errors.captionPosition = "Select a caption position.";
    }

    if (!Number.isFinite(form.maxSizePerItem) || form.maxSizePerItem <= 0)
      errors.maxSizePerItem = "File size must be greater than zero.";
    if (
      !Number.isFinite(form.maxItemsPerGallery) ||
      form.maxItemsPerGallery <= 0
    )
      errors.maxItemsPerGallery =
        "Items per gallery must be greater than zero.";
    if (
      !Number.isFinite(form.maxGalleriesPerUser) ||
      form.maxGalleriesPerUser <= 0
    )
      errors.maxGalleriesPerUser =
        "Galleries per user must be greater than zero.";
    if (!Number.isInteger(form.gridColumns) || form.gridColumns < 1)
      errors.gridColumns = "Columns must be at least 1.";
    if (!Number.isInteger(form.gridRows) || form.gridRows < 1)
      errors.gridRows = "Rows must be at least 1.";
    if (!Number.isInteger(form.thumbnailsPerPage) || form.thumbnailsPerPage < 1)
      errors.thumbnailsPerPage = "Items per page must be at least 1.";
    if (!Number.isInteger(form.thumbnailsPerRow) || form.thumbnailsPerRow < 1)
      errors.thumbnailsPerRow = "Thumbnails per row must be at least 1.";
    if (
      !Number.isFinite(form.visibleToInstructorsAfter) ||
      form.visibleToInstructorsAfter < 0
    )
      errors.visibleToInstructorsAfter = "Delay cannot be negative.";
    if (form.readOnlyFrom && !form.readOnlyTo) {
      errors.readOnlyTo = "Select an end date.";
    }
    if (!form.readOnlyFrom && form.readOnlyTo) {
      errors.readOnlyFrom = "Select a start date.";
    }
    if (
      form.readOnlyFrom &&
      form.readOnlyTo &&
      form.readOnlyFrom > form.readOnlyTo
    ) {
      errors.readOnlyTo = "End date cannot be before start date.";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError("Please correct the highlighted fields.");
      window.requestAnimationFrame(() => {
        const fieldIds: Partial<Record<keyof MediaCollectionRequest, string>> =
          {
            collectionName: "collectionName",
            description: "description",
            tags: "tagInput",
            collectionType: "collectionType-INSTRUCTOR_COLLECTION",
            galleryView: "galleryView",
            galleryFocus: "galleryFocus",
            gridColumns: "gridColumns",
            gridRows: "gridRows",
            captionPosition: "captionPosition",
            thumbnailsPerPage: "thumbnailsPerPage",
            maxSizePerItem: "maxSizePerItem",
            maxItemsPerGallery: "maxItemsPerGallery",
            maxGalleriesPerUser: "maxGalleriesPerUser",
            readOnlyFrom: "readOnlyFrom",
            readOnlyTo: "readOnlyTo",
            visibleToInstructorsAfter: "visibleToInstructorsAfter",
          };
        const firstError = (
          Object.keys(errors) as Array<keyof MediaCollectionRequest>
        ).find((field) => fieldIds[field]);
        if (firstError) {
          document.getElementById(fieldIds[firstError] as string)?.focus();
        }
      });
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading || !validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload: MediaCollectionRequest = {
        ...form,
        collectionName: form.collectionName.trim(),
        description: form.description.trim(),
        tags: tags.join(","),
      };
      const response = await createCollection(payload);
      console.log("Collection created successfully:", response.data);
      setSuccess("Media collection created successfully!");
      setForm({ ...initialForm });
      setTags([]);
      setTagInput("");
      setFieldErrors({});
    } catch (err: unknown) {
      console.error("Create collection API failed:", err);
      let message = "Unable to create collection. Please try again.";
      if (typeof err === "object" && err !== null && "response" in err) {
        const apiError = err as {
          response?: { data?: { message?: string } };
        };
        message = apiError.response?.data?.message || message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:ring-3 focus:ring-blue-100";
  const labelClass = "block text-sm font-bold text-slate-950";
  const sectionClass =
    "rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]";

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="hidden text-slate-400 sm:inline">
                Media collections
              </span>
              <ChevronRightIcon className="hidden h-3.5 w-3.5 text-slate-300 sm:block" />
              <span className="font-semibold text-slate-800">
                New collection
              </span>
            </div>
          </div>
          <button
            type="submit"
            form="create-collection-form"
            disabled={loading}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-[0_6px_18px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ?
              <>
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Creating...</span>
              </>
            : <>
                <PlusIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Create collection</span>
                <span className="sm:hidden">Create</span>
              </>
            }
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-5 md:px-6">
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Create a media collection
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">
            Set up a shared space for videos, audio, images and learning
            resources.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
          >
            <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
              aria-label="Dismiss error"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {success && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm text-emerald-700"
          >
            <CheckCircleIcon className="h-5 w-5 shrink-0" />
            <span>{success}</span>
            <button
              type="button"
              onClick={() => setSuccess("")}
              className="ml-auto"
              aria-label="Dismiss success"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        <form
          id="create-collection-form"
          onSubmit={handleSubmit}
          noValidate
          className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div className="space-y-4">
            <section className={sectionClass}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <DocumentTextIcon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900">
                    Collection details
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Basic information and discoverability
                  </p>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                <div>
                  <label htmlFor="collectionName" className={labelClass}>
                    Collection name <span className="text-blue-600">*</span>
                  </label>
                  <input
                    id="collectionName"
                    maxLength={150}
                    placeholder="e.g. Leadership learning hub"
                    value={form.collectionName}
                    onChange={(event) =>
                      updateField("collectionName", event.target.value)
                    }
                    aria-invalid={Boolean(fieldErrors.collectionName)}
                    className={`${inputClass} ${fieldErrors.collectionName ? "!border-red-400 !ring-red-100" : ""}`}
                  />
                  <div className="mt-1.5 flex justify-between text-xs">
                    {fieldErrors.collectionName ?
                      <p className="font-medium text-red-600">
                        {fieldErrors.collectionName}
                      </p>
                    : <span />}
                    <p className="text-slate-400">
                      {form.collectionName.length}/150
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className={labelClass}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    placeholder="Describe what learners will find in this collection..."
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    aria-invalid={Boolean(fieldErrors.description)}
                    className={`${inputClass} resize-y ${fieldErrors.description ? "!border-red-400 !ring-red-100" : ""}`}
                  />
                  {fieldErrors.description && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.description}
                    </p>
                  )}
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-blue-200">
                  <input
                    type="checkbox"
                    checked={form.displayDescription}
                    onChange={(event) =>
                      updateField("displayDescription", event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Show description
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      Display this text on the collection page
                    </span>
                  </span>
                </label>

                <div>
                  <label htmlFor="tagInput" className={labelClass}>
                    Tags
                  </label>
                  <div
                    className={`mt-2 flex min-h-12 flex-wrap items-center gap-2 rounded-xl border p-2 ${fieldErrors.tags ? "border-red-400 ring-4 ring-red-100" : "border-slate-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100"}`}
                  >
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          aria-label={`Remove ${tag}`}
                        >
                          <XMarkIcon className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                    <input
                      id="tagInput"
                      value={tagInput}
                      placeholder={
                        tags.length ? "Add another..." : "Type a tag"
                      }
                      onChange={(event) => setTagInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addTag();
                        }
                      }}
                      className="min-w-28 flex-1 border-0 px-2 text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="rounded-lg px-2 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-50"
                    >
                      Add
                    </button>
                  </div>
                  {fieldErrors.tags && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.tags}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <div className="mb-3">
                <h2 className="font-bold text-slate-900">Collection type</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Choose how people contribute and interact
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {collectionTypes.map((type) => {
                  const Icon = type.icon;
                  const selected = form.collectionType === type.value;
                  return (
                    <button
                      key={type.value}
                      id={`collectionType-${type.value}`}
                      type="button"
                      aria-pressed={selected}
                      aria-invalid={Boolean(fieldErrors.collectionType)}
                      onClick={() =>
                        updateField(
                          "collectionType",
                          type.value as CollectionType,
                        )
                      }
                      className={`flex items-start gap-2.5 rounded-lg border p-3 text-left transition ${
                        selected ?
                          "border-blue-600 bg-blue-50/70 ring-4 ring-blue-100/60"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-slate-800">
                          {type.title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {type.description}
                        </span>
                      </span>
                      <span
                        className={`mt-1 h-4 w-4 shrink-0 rounded-full border ${selected ? "border-[5px] border-blue-600" : "border-slate-300"}`}
                      />
                    </button>
                  );
                })}
              </div>
              {fieldErrors.collectionType && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {fieldErrors.collectionType}
                </p>
              )}
            </section>

            <section className={sectionClass}>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <Squares2X2Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900">
                    Gallery appearance
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Control the collection layout
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className={labelClass}>Gallery view</label>
                  <select
                    id="galleryView"
                    value={form.galleryView}
                    onChange={(event) =>
                      updateField(
                        "galleryView",
                        event.target.value as GalleryView,
                      )
                    }
                    className={`${inputClass} ${fieldErrors.galleryView ? "!border-red-400 !ring-red-100" : ""}`}
                  >
                    <option value="GRID">Grid</option>
                    <option value="LIST">List</option>
                  </select>
                  {fieldErrors.galleryView && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.galleryView}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Media focus</label>
                  <select
                    id="galleryFocus"
                    value={form.galleryFocus}
                    onChange={(event) =>
                      updateField(
                        "galleryFocus",
                        event.target.value as GalleryFocus,
                      )
                    }
                    className={`${inputClass} ${fieldErrors.galleryFocus ? "!border-red-400 !ring-red-100" : ""}`}
                  >
                    <option value="ALL">All media</option>
                    <option value="AUDIO">Audio</option>
                    <option value="VIDEO">Video</option>
                    <option value="IMAGE">Image</option>
                  </select>
                  {fieldErrors.galleryFocus && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.galleryFocus}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Columns</label>
                  <select
                    id="gridColumns"
                    value={form.gridColumns}
                    onChange={(event) =>
                      updateField("gridColumns", Number(event.target.value))
                    }
                    className={`${inputClass} ${fieldErrors.gridColumns ? "!border-red-400 !ring-red-100" : ""}`}
                  >
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.gridColumns && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.gridColumns}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Grid rows</label>
                  <input
                    id="gridRows"
                    type="number"
                    min={1}
                    value={form.gridRows}
                    onChange={(event) =>
                      updateField("gridRows", Number(event.target.value))
                    }
                    className={`${inputClass} ${fieldErrors.gridRows ? "!border-red-400 !ring-red-100" : ""}`}
                  />
                  {fieldErrors.gridRows && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.gridRows}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Caption position</label>
                  <select
                    id="captionPosition"
                    value={form.captionPosition}
                    onChange={(event) =>
                      updateField(
                        "captionPosition",
                        event.target.value as CaptionPosition,
                      )
                    }
                    className={`${inputClass} ${fieldErrors.captionPosition ? "!border-red-400 !ring-red-100" : ""}`}
                  >
                    <option value="Bottom">Bottom</option>
                    <option value="Top">Top</option>
                  </select>
                  {fieldErrors.captionPosition && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.captionPosition}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Items per page</label>
                  <input
                    id="thumbnailsPerPage"
                    type="number"
                    min={1}
                    value={form.thumbnailsPerPage}
                    onChange={(event) =>
                      updateField(
                        "thumbnailsPerPage",
                        Number(event.target.value),
                      )
                    }
                    className={`${inputClass} ${fieldErrors.thumbnailsPerPage ? "!border-red-400 !ring-red-100" : ""}`}
                  />
                  {fieldErrors.thumbnailsPerPage && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.thumbnailsPerPage}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2">
                {[
                  ["displayFullCaption", "Display full captions"],
                  ["enforceGalleryDefaults", "Enforce gallery defaults"],
                ].map(([field, title]) => (
                  <label
                    key={field}
                    className="flex cursor-pointer items-center gap-3 rounded-lg text-sm font-medium text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={
                        form[
                          field as
                            | "displayFullCaption"
                            | "enforceGalleryDefaults"
                        ]
                      }
                      onChange={(event) =>
                        updateField(
                          field as
                            | "displayFullCaption"
                            | "enforceGalleryDefaults",
                          event.target.checked,
                        )
                      }
                      className="h-4 w-4 rounded accent-blue-600"
                    />
                    {title}
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-3 xl:sticky xl:top-20">
            <section className={sectionClass}>
              <h2 className="mb-3 font-bold text-slate-900">Upload limits</h2>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Maximum file size</label>
                  <select
                    id="maxSizePerItem"
                    value={form.maxSizePerItem}
                    onChange={(event) =>
                      updateField("maxSizePerItem", Number(event.target.value))
                    }
                    className={`${inputClass} ${fieldErrors.maxSizePerItem ? "!border-red-400 !ring-red-100" : ""}`}
                  >
                    {[10, 25, 50, 100, 250, 500].map((size) => (
                      <option key={size} value={size}>
                        {size} MB
                      </option>
                    ))}
                  </select>
                  {fieldErrors.maxSizePerItem && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.maxSizePerItem}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Items per gallery</label>
                    <select
                      id="maxItemsPerGallery"
                      value={form.maxItemsPerGallery}
                      onChange={(event) =>
                        updateField(
                          "maxItemsPerGallery",
                          Number(event.target.value),
                        )
                      }
                      className={`${inputClass} ${fieldErrors.maxItemsPerGallery ? "!border-red-400 !ring-red-100" : ""}`}
                    >
                      {[10, 25, 50, 100, 200, 500].map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.maxItemsPerGallery && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {fieldErrors.maxItemsPerGallery}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Galleries per user</label>
                    <select
                      id="maxGalleriesPerUser"
                      value={form.maxGalleriesPerUser}
                      onChange={(event) =>
                        updateField(
                          "maxGalleriesPerUser",
                          Number(event.target.value),
                        )
                      }
                      className={`${inputClass} ${fieldErrors.maxGalleriesPerUser ? "!border-red-400 !ring-red-100" : ""}`}
                    >
                      {[1, 5, 10, 20, 50, 100].map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.maxGalleriesPerUser && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {fieldErrors.maxGalleriesPerUser}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Read-only schedule
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Restrict changes during a selected period
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  Optional
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="readOnlyFrom" className={labelClass}>
                    From
                  </label>
                  <input
                    id="readOnlyFrom"
                    type="date"
                    value={form.readOnlyFrom ?? ""}
                    onChange={(event) =>
                      updateField("readOnlyFrom", event.target.value || null)
                    }
                    className={`${inputClass} ${fieldErrors.readOnlyFrom ? "!border-red-400 !ring-red-100" : ""}`}
                  />
                  {fieldErrors.readOnlyFrom && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.readOnlyFrom}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="readOnlyTo" className={labelClass}>
                    To
                  </label>
                  <input
                    id="readOnlyTo"
                    type="date"
                    value={form.readOnlyTo ?? ""}
                    min={form.readOnlyFrom ?? undefined}
                    onChange={(event) =>
                      updateField("readOnlyTo", event.target.value || null)
                    }
                    className={`${inputClass} ${fieldErrors.readOnlyTo ? "!border-red-400 !ring-red-100" : ""}`}
                  />
                  {fieldErrors.readOnlyTo && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.readOnlyTo}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className="mb-2 font-bold text-slate-900">Interactions</h2>
              <div className="divide-y divide-slate-100">
                {[
                  {
                    title: "Allow comments",
                    description: "Learners can discuss media",
                    field: "allowComments" as const,
                    icon: ChatBubbleLeftRightIcon,
                  },
                  {
                    title: "Allow likes",
                    description: "Learners can react to media",
                    field: "allowLikes" as const,
                    icon: HeartIcon,
                  },
                  {
                    title: "Graded collection",
                    description: "Include in learner grades",
                    field: "isGraded" as const,
                    icon: AcademicCapIcon,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.field}
                      className="flex items-center justify-between gap-3 py-2.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-label={item.title}
                        aria-checked={form[item.field]}
                        onClick={() =>
                          updateField(item.field, !form[item.field])
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${form[item.field] ? "bg-blue-600" : "bg-slate-300"}`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${form[item.field] ? "left-6" : "left-1"}`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className="mb-3 font-bold text-slate-900">Visibility</h2>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3.5">
                <input
                  type="checkbox"
                  checked={form.visibleToInstructorsOnly}
                  onChange={(event) =>
                    updateField(
                      "visibleToInstructorsOnly",
                      event.target.checked,
                    )
                  }
                  className="mt-0.5 h-4 w-4 rounded accent-blue-600"
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    Instructors only
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Hide collection from learners
                  </span>
                </span>
              </label>
              <div className="mt-4">
                <label className={labelClass}>
                  Visible to instructors after
                </label>
                <input
                  id="visibleToInstructorsAfter"
                  type="number"
                  min={0}
                  value={form.visibleToInstructorsAfter}
                  onChange={(event) =>
                    updateField(
                      "visibleToInstructorsAfter",
                      Number(event.target.value),
                    )
                  }
                  className={`${inputClass} ${fieldErrors.visibleToInstructorsAfter ? "!border-red-400 !ring-red-100" : ""}`}
                />
                {fieldErrors.visibleToInstructorsAfter && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {fieldErrors.visibleToInstructorsAfter}
                  </p>
                )}
              </div>
            </section>

            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <LockClosedIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
              <div>
                <p className="text-sm font-bold text-slate-950">
                  Permission controlled
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-700">
                  Only authorized users can view or manage content.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default MediaCollection;
