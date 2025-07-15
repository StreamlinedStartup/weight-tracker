"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createEntry, uploadFile } from "@/services/baserow";
import type { NewEntryData } from "@/types";
import { showSuccess, showError } from "@/utils/toast";

const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  week: z.coerce.number().min(1, "Week number must be at least 1."),
  dose: z.coerce.number().min(0, "Dose must be a positive number."),
  weight: z.coerce.number().min(0.1, "Weight must be greater than 0."),
  notes: z.string().optional(),
  photo: z.instanceof(FileList).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function EntryForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      week: 1,
      dose: 0,
      weight: 0,
      notes: "",
    },
  });

  const photoRef = form.register("photo");

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      let photoPayload: { name: string }[] = [];

      if (values.photo && values.photo.length > 0) {
        const uploadedPhoto = await uploadFile(values.photo[0]);
        photoPayload.push({ name: uploadedPhoto.name });
      }

      const entryData: NewEntryData = {
        "Date": values.date.toISOString(),
        "Week": values.week,
        "Dose(mg)": values.dose,
        "Weight": values.weight,
        "Notes": values.notes || "",
        "Photos": photoPayload,
      };

      return createEntry(entryData);
    },
    onSuccess: () => {
      showSuccess("Entry created successfully!");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      navigate("/");
    },
    onError: (error) => {
      showError(`Failed to create entry: ${error.message}`);
    },
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="e.g. 70.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="week"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Week #</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dose (MG)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="e.g. 2.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any notes about your week..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={() => (
            <FormItem>
              <FormLabel>Progress Photo</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" {...photoRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Entry"}
            </Button>
        </div>
      </form>
    </Form>
  );
}