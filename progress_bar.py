from rich.progress import Task, Column, ProgressColumn, DownloadColumn, Text, Union, Sequence, TransferSpeedColumn, ProgressType, Iterable, Optional, List, TextColumn, BarColumn, TimeRemainingColumn, Progress

columns = (
    TextColumn("[progress.description]{task.description}"),
    BarColumn(),
    DownloadColumn(),
    TransferSpeedColumn(),
    TextColumn("eta"),
    TimeRemainingColumn(),
)

class TaskCompletedColumn(ProgressColumn):
    """Renders file size downloaded and total, e.g. '0.5/2.3 GB'.

    Args:
        binary_units (bool, optional): Use binary units, KiB, MiB etc. Defaults to False.
    """

    def __init__(
        self, binary_units: bool = False, table_column: Optional[Column] = None
    ) -> None:
        self.binary_units = binary_units
        super().__init__(table_column=table_column)

    def render(self, task: "Task") -> Text:
        """Calculate common unit for completed and total."""
        completed_str = f"{int(task.completed)}"

        if task.total is not None:
            total_str = f"{int(task.total)}"
        else:
            total_str = "?"

        download_status = f"{completed_str}/{total_str}"
        download_text = Text(download_status, style="progress.download")
        return download_text

class TransferSpeedColumn(ProgressColumn):
    """Renders human readable transfer speed."""

    def render(self, task: "Task") -> Text:
        """Show data transfer speed."""
        speed = task.finished_speed or task.speed
        if speed is None:
            return Text("?", style="progress.data.speed")
        data_speed = str(round(speed, 2) if speed < 100000 else int(speed))
        return Text(f"{data_speed}/s", style="progress.data.speed")

def track(
    sequence: Union[Sequence[ProgressType], Iterable[ProgressType]],
    description: str = "Working...",
    total: Optional[float] = None,
) -> Iterable[ProgressType]:
    """Wrapper of `rich.progress.track` - Track progress by iterating over a sequence.

    Args:
        sequence (Iterable[ProgressType]): A sequence (must support "len") you wish to iterate over.
        description (str, optional): Description of task show next to progress bar. Defaults to "Working".
        total: (float, optional): Total number of steps. Default is len(sequence).
    Returns:
        Iterable[ProgressType]: An iterable of the values in the sequence.

    """

    columns: List["ProgressColumn"] = (
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TaskCompletedColumn(),
        TransferSpeedColumn(),
        TextColumn("eta"),
        TimeRemainingColumn(),
    )
    progress = Progress(*columns, refresh_per_second=30)

    with progress:
        yield from progress.track(sequence, total=total, description=description)
